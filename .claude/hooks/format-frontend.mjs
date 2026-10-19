// Hook PostToolUse: formatea con Prettier el archivo editado si está en frontend/src/ (.ts, .tsx, .css).
// Nunca bloquea al agente: ante cualquier error sale con código 0.
import { execFileSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import path from 'node:path'

const EXTENSIONS = new Set(['.ts', '.tsx', '.css'])

let input = ''
process.stdin.setEncoding('utf8')
process.stdin.on('data', (chunk) => (input += chunk))
process.stdin.on('end', () => {
  try {
    const payload = JSON.parse(input)
    const filePath = payload?.tool_input?.file_path
    if (!filePath) return

    const projectDir = process.env.CLAUDE_PROJECT_DIR || payload.cwd || process.cwd()
    const frontendDir = path.resolve(projectDir, 'frontend')
    const srcDir = path.join(frontendDir, 'src')
    const absFile = path.resolve(projectDir, filePath)

    const rel = path.relative(srcDir, absFile)
    if (!rel || rel.startsWith('..') || path.isAbsolute(rel)) return
    if (!EXTENSIONS.has(path.extname(absFile).toLowerCase())) return

    const prettierBin = path.join(frontendDir, 'node_modules', 'prettier', 'bin', 'prettier.cjs')
    if (!existsSync(prettierBin) || !existsSync(absFile)) return

    execFileSync(process.execPath, [prettierBin, '--write', absFile], {
      cwd: frontendDir,
      stdio: 'ignore',
      timeout: 20000,
    })
  } catch {
    // Si Prettier falla, no hacemos nada: la edición ya está hecha.
  }
  process.exit(0)
})
