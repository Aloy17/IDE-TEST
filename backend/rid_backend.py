"""
RID Backend - Python Transpiler Integration
Handles RID code execution via Electron IPC
"""

import sys
import json
import io
from contextlib import redirect_stdout, redirect_stderr
import os

# Add transpiler directory to path
backend_dir = os.path.dirname(os.path.abspath(__file__))
transpiler_dir = os.path.join(backend_dir, 'rid_transpiler')
sys.path.insert(0, transpiler_dir)

# Also try parent directory (for direct imports)
parent_dir = os.path.dirname(backend_dir)
sys.path.insert(0, parent_dir)

try:
    from lexer import lex
    from parser import Parser
except ImportError as e:
    print(json.dumps({
        'success': False,
        'error': f'Failed to import RID transpiler: {str(e)}\nSearched in: {transpiler_dir}'
    }))
    sys.exit(1)


def execute_rid(rid_code):
    """
    Execute RID code and return output
    
    Args:
        rid_code (str): RID source code
        
    Returns:
        dict: Result with success status and output/error
    """
    try:
        # Tokenize
        tokens = lex(rid_code)
        
        if not tokens:
            return {
                'success': True,
                'output': ''
            }
        
        # Parse
        parser = Parser(tokens)
        parser.parse()
        
        # Get Python code
        python_code = '\n'.join(parser.output)
        
        if not python_code.strip():
            return {
                'success': True,
                'output': ''
            }
        
        # Execute and capture output
        output_buffer = io.StringIO()
        error_buffer = io.StringIO()
        
        with redirect_stdout(output_buffer), redirect_stderr(error_buffer):
            # Create execution namespace
            exec_globals = {}
            exec(python_code, exec_globals)
        
        # Get output
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
            'error': f'Syntax Error: {str(e)}'
        }
    except NameError as e:
        return {
            'success': False,
            'error': f'Name Error: {str(e)}'
        }
    except Exception as e:
        error_msg = str(e)
        error_type = type(e).__name__
        return {
            'success': False,
            'error': f'{error_type}: {error_msg}'
        }


def main():
    """Main entry point - read code from stdin and execute"""
    try:
        # Read code from stdin
        code = sys.stdin.read()
        
        if not code.strip():
            print(json.dumps({
                'success': True,
                'output': ''
            }))
            return
        
        # Execute RID code
        result = execute_rid(code)
        
        # Output result as JSON
        print(json.dumps(result))
        
    except Exception as e:
        print(json.dumps({
            'success': False,
            'error': f'Backend error: {str(e)}'
        }))


if __name__ == '__main__':
    main()
