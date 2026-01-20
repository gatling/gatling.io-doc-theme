# {{ .Title }}

{{ .Content }}

## Pages in this section

{{- range .Pages }}
- [{{ .Title }}]({{ .RelPermalink }}index.md){{ with .Description }}: {{ . }}{{ end }}
{{- end }}
