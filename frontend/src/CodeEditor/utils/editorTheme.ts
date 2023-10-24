import * as monaco from 'monaco-editor';

export const editorTheme = () => {
    console.log("editorTheme");
    monaco.editor.defineTheme('customTheme', {
        base: 'vs-dark',
        inherit: true,
        rules: [
        ],
        colors: {
        }
    });
    monaco.editor.setTheme('customTheme');
}