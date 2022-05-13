#!/usr/bin/env sh

if [ -z "$skip_hook" ]; then

    debug () {
        echo "$1"
    }

    readonly hook_name="$(basename -- "$0")"

    debug "starting $hook_name hook..."

    readonly skip_hook=1
    export skip_hook

    sh -e $0

    exitCode="$?"

    if [ $exitCode != 0 ]; then
        echo "$hook_name hook exited with code $exitCode (error)"
    fi

    if [ $exitCode = 127 ]; then
        echo "command not found in PATH=$PATH"
    fi

    exit $exitCode
fi
