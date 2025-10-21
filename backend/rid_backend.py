import sys
import json
import io
import base64
from contextlib import redirect_stdout, redirect_stderr
import os

# Setup paths for transpiler imports
if getattr(sys, 'frozen', False):
    # Running as PyInstaller bundle
    backend_dir = sys._MEIPASS
else:
    # Running as normal Python script
    backend_dir = os.path.dirname(os.path.abspath(__file__))

transpiler_dir = os.path.join(backend_dir, 'rid_transpiler')
if os.path.exists(transpiler_dir):
    sys.path.insert(0, transpiler_dir)

try:
    from rid_transpiler.lexer import lex
    from rid_transpiler.parser import Parser
except ImportError:
    # Fallback to direct imports
    try:
        from lexer import lex
        from parser import Parser
    except ImportError as e:
        print(json.dumps({
            'success': False,
            'error': f'Failed to import RID transpiler: {str(e)}'
        }))
        sys.exit(1)


def execute_rid(rid_code):
    try:
        tokens = lex(rid_code)
        
        if not tokens:
            return {
                'success': True,
                'output': ''
            }
        parser = Parser(tokens)
        parser.parse()
        python_code = '\n'.join(parser.output)
        
        if not python_code.strip():
            return {
                'success': True,
                'output': ''
            }
        output_buffer = io.StringIO()
        error_buffer = io.StringIO()
        
        # Save reference to real stdout, stderr and stdin before redirection
        real_stdout = sys.stdout
        real_stderr = sys.stderr
        real_stdin = sys.stdin
        
        # Custom input function that sends prompts to real stderr
        def custom_input(prompt=''):
            if prompt:
                # Write prompt to real stderr with special marker (not buffered)
                # Use stderr for prompts so they don't interfere with JSON output on stdout
                real_stderr.write(f"__RIDLEY_PROMPT__{prompt}")
                real_stderr.flush()
            # Read from real stdin
            return real_stdin.readline().rstrip('\n')
        
        # stdin is naturally available since we didn't close it
        # Only stdout and stderr are redirected
        with redirect_stdout(output_buffer), redirect_stderr(error_buffer):
            exec_globals = {'input': custom_input}  # Override input with our custom version
            exec(python_code, exec_globals)
        stdout_output = output_buffer.getvalue()
        stderr_output = error_buffer.getvalue()
        
        if stderr_output:
            return {
                'success': False,
                'error': stderr_output
            }
        
        return {
            'success': True,
            'output': stdout_output
        }
        
    except SyntaxError as e:
        return {
            'success': False,
            'error': str(e)
        }
    except NameError as e:
        return {
            'success': False,
            'error': str(e)
        }
    except ZeroDivisionError as e:
        return {
            'success': False,
            'error': 'Division by zero'
        }
    except TypeError as e:
        return {
            'success': False,
            'error': str(e)
        }
    except ValueError as e:
        return {
            'success': False,
            'error': str(e)
        }
    except RecursionError as e:
        return {
            'success': False,
            'error': 'Maximum recursion depth exceeded'
        }
    except KeyboardInterrupt:
        return {
            'success': False,
            'error': 'Execution interrupted by user'
        }
    except Exception as e:
        error_msg = str(e)
        error_type = type(e).__name__
        return {
            'success': False,
            'error': f'{error_type}: {error_msg}'
        }


def main():
    try:
        if len(sys.argv) < 2:
            print(json.dumps({
                'success': False,
                'error': 'No code provided'
            }))
            return
        
        code_base64 = sys.argv[1]
        code = base64.b64decode(code_base64).decode('utf-8')
        
        if not code.strip():
            print(json.dumps({
                'success': True,
                'output': ''
            }))
            return
        
        result = execute_rid(code)
        print(json.dumps(result))
        
    except Exception as e:
        print(json.dumps({
            'success': False,
            'error': f'Backend error: {str(e)}'
        }))


if __name__ == '__main__':
    main()
