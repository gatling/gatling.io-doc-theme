# {{ .Title }}

{{ .Content | plainify }}

## Pages in this section

{{- range .Pages }}
- [{{ .Title }}]({{ .Permalink }}index.md){{ with .Description }}: {{ . }}{{ end }}
{{- end }}
