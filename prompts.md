# Prompts

Aquí van **todos los prompts que lanzaste** para hacer el ejercicio, en el orden en que los
lanzaste, con el modelo y la herramienta de cada uno.

Esto no es papeleo. Lo que se revisa es **cómo pediste las cosas**, no solo lo que salió: un
resultado flojo con un prompt bueno y un resultado flojo con un prompt vago necesitan feedback
distinto, y sin este archivo no se distinguen.

## Cómo rellenarlo

- Un apartado `## Prompt N` por cada prompt.
- **Pega el prompt tal cual lo lanzaste**, dentro del bloque de código, aunque ocupe diez líneas
  y aunque tenga faltas. No lo reescribas para que quede bien: el que arreglaste mentalmente
  después no es el que lanzaste.
- Incluye también los que **no funcionaron**. Suelen ser los más útiles de leer.
- `Modelo` y `Herramienta` en todos. Si cambiaste de una a otra a mitad, se nota aquí.

Borra el ejemplo de abajo cuando escribas el primero.

---

## Prompt 1

**Modelo:** Opus 5.5 Medium 
**Herramienta:** Claude Code en VSCode
**Repo:** flowsync-ai4devs-202610-seniors-I

```
/init

```

**Qué salió:**
Claude me generó el archivo CLAUDE.md

## Prompt 2

**Modelo:** Opus 5.5 Medium 
**Herramienta:** Claude Code en VSCode
**Repo:** flowsync-ai4devs-202610-seniors-I

```
/priority-ticket

```

**Qué salió:**
Primer intento fallido: la skill no existía, Claude improvisó y el plan salió en inglés.

## Prompt 3

**Modelo:** Opus 5.5 Medium 
**Herramienta:** Claude Code en VSCode
**Repo:** flowsync-ai4devs-202610-seniors-I

```
Crea una skill para este proyecto llamada priority-ticket en .claude/skills/priority-ticket/SKILL.md (crear la carpeta dentro de este repo, solo este repo puede ver esta skill).

Al invocar /priority-ticket debe:
1. Acceder a Jira (proyecto FlowSync, a través del MCP de Atlassian) el ticket de mayor prioridad asignado a mí en estado «Por hacer».
2. Mostrar el ticket, el título y un resumen de sus criterios de aceptación.
3. Entrar en plan mode y proponer cómo implementarlo, leyendo el código real del proyecto antes de proponer.
4. Solo cuando yo apruebe el plan, mover el ticket a «En curso».

Restricciones:
- Si no hay ningún ticket que cumpla el filtro, informarlo y finalizar.
- No escribir código ni mover el ticket antes de que se apruebe el plan.

Cuando termines, enséñame el contenido del SKILL.md y no hagas nada más.
```

**Qué salió:**
Claude me generó el archivo skill.md con el skill de /priority-ticket


## Prompt 4

**Modelo:** Opus 5.5 Medium 
**Herramienta:** Claude Code en VSCode
**Repo:** flowsync-ai4devs-202610-seniors-I

```
/priority-ticket

```

**Qué salió:**
Segundo intento fallido. Cuando lo ejecutó por primera vez me sale el siguiente mensaje: "/priority-ticket no está registrado en esta sesión porque la skill se creó con la sesión ya abierta. Sigo los pasos del SKILL.md a mano."


## Prompt 5

**Modelo:** Opus 5.5 Medium 
**Herramienta:** Claude Code en VSCode
**Repo:** flowsync-ai4devs-202610-seniors-I

```
/priority-ticket

```

**Qué salió:**
Tercer intento, este sí tuve éxito. Abrí una nueva sesión de Claude, y al ejecutar este prompt, Claude cargó la skill, entró en plan mode y generó el plan en español. No lo aprobé.


## Prompt 6

**Modelo:** Opus 5.5 Medium 
**Herramienta:** Claude Code en VSCode
**Repo:** flowsync-sin-harness

```
Busca en Jira (proyecto FlowSync) el ticket de mayor prioridad asignado a mí en estado «Por hacer», muestrame el ticket, 
el título y un resumen de sus criterios de aceptación, entra en plan mode y arma el plan de implementación leyendo el código 
del proyecto. Solo cuando apruebe el plan, mueve el ticket a «En curso».
```
**Qué salió:**
A priori, salió todo ok, generó el plan a la primera sin preguntarme nada.


## Prompt 7

**Modelo:** Opus 5.5 Medium 
**Herramienta:** Claude Code en VSCode
**Repo:** flowsync-ai4devs-202610-seniors-I

```

Crea una skill de proyecto llamada commit en .claude/skills/commit/SKILL.md (dentro de este repo, no a nivel de usuario).

Al invocar /commit debe:
1. Mirar solo los cambios ya preparados con `git diff --staged`.
2. Proponer un mensaje de commit convencional con el formato `tipo(scope): descripción`, en español.
   - Tipos permitidos: feat, fix, docs, refactor, test, chore, style.
   - El scope es la parte afectada del proyecto (por ejemplo frontend, backend, harness, docs).
   - La descripción en minúscula, en imperativo y sin punto final.
3. Hacer el commit con ese mensaje.

Restricciones:
- Si no hay cambios preparados, decirlo y terminar.
- No ejecutar `git add` por su cuenta: solo se commitea lo que yo haya preparado.
- No hacer `git push`.

Cuando termines, enséñame el contenido del SKILL.md y no hagas nada más.

```
**Qué salió:**
Claude me generó el archivo skill.md con el skill de /commit




## Prompt 8

**Modelo:** Opus 5.5 Medium 
**Herramienta:** Claude Code en VSCode
**Repo:** flowsync-ai4devs-202610-seniors-I

```

Crea un subagente de proyecto llamado adversarial-reviewer en .claude/agents/adversarial-reviewer.md (dentro de este repo).

Su trabajo es revisar un pull request intentando romperlo, no aprobarlo:
1. Leer el diff del PR con `gh pr diff <número>` y la descripción con `gh pr view <número>`.
2. Leer el código relacionado que haga falta para entender los cambios, incluido CLAUDE.md.
3. Buscar activamente problemas: errores de lógica, casos límite no cubiertos, incumplimientos del contrato del backend (validadores, errores 400/401/422, forma { data }), incumplimientos de las convenciones de CLAUDE.md, falta de manejo de errores y riesgos de seguridad.
4. Devolver un informe con cada hallazgo: archivo y línea, qué falla, por qué importa y cómo reproducirlo. Ordenados de más a menos grave.

Restricciones:
- Solo lectura: no puede editar ni crear archivos, ni hacer commits, ni comentar en GitHub.
- Si no encuentra problemas, que lo diga explicando qué revisó, en vez de aprobar sin más.

Cuando termines, enséñame el contenido del archivo y no hagas nada más.

```
**Qué salió:**
Claude me generó el archivo adversarial-reviewer.md dentro de la carpeta .claude/agents con el agente.


## Prompt 9

**Modelo:** Opus 5.5 Medium 
**Herramienta:** Claude Code en VSCode
**Repo:** flowsync-ai4devs-202610-seniors-I

```
Usa el subagente adversarial-reviewer para revisar el PR #21 del repo LIDR-academy-temp/flowsync-ai4devs-202610-seniors-I
```
**Qué salió:**
Me generó el texto del review pero al final me ofrece aplicar los cambios, le dije que no. El revisor no debe aplicar cambios pero el agente principal si me ofrece aplicarlos.


## Prompt 10

**Modelo:** Opus 5.5 Medium 
**Herramienta:** Claude Code en VSCode
**Repo:** flowsync-ai4devs-202610-seniors-I

```

Quiero un hook que formatee el frontend automáticamente.

1. Instala Prettier como dependencia de desarrollo en frontend/ (no en la raíz ni en backend/) y crea su archivo de configuración en frontend/.
2. Crea un hook PostToolUse a nivel de proyecto en .claude/settings.json que se dispare después de Edit, Write o MultiEdit.
3. El hook debe formatear con Prettier solo el archivo editado, y solo si está dentro de frontend/src/ (archivos .ts, .tsx, .css). Si el archivo está en otra carpeta, no debe hacer nada.

Restricciones:
- Estoy en Windows: el hook tiene que funcionar ahí. Usa un script de Node en .claude/hooks/ en vez de comandos de Linux como jq o grep.
- Si Prettier falla, el hook no debe bloquear al agente ni romper la edición.
- No formatees ahora los archivos existentes ni toques el backend.

Cuando termines, enséñame .claude/settings.json y el script del hook, y no hagas nada más.

```
**Qué salió:**
Generó el hook y el archivo settings.json


## Prompt 11

**Modelo:** Opus 5.5 Medium 
**Herramienta:** Claude Code en VSCode
**Repo:** flowsync-ai4devs-202610-seniors-I

```
Añade al final de CLAUDE.md una sección "Process rules" con estas reglas de proceso, en el mismo idioma que el resto del archivo:

1. Antes de tocar código, crea una rama nueva desde la rama actual con un nombre descriptivo (por ejemplo feat/login-frontend). Nunca trabajes directamente en main, harness-cmelon ni harness-completo.
2. Al terminar, haz el commit con la skill /commit y abre el pull request con `gh pr create`.
3. El pull request va siempre contra mi fork (chrmelon/flowsync-ai4devs-202610-seniors-I), nunca contra el repo del curso (LIDR-academy-temp), salvo que yo lo pida expresamente.
4. Después de abrir el pull request, lanza el subagente adversarial-reviewer sobre él.
5. En el chat, al terminar, responde solo con la URL del pull request.

No cambies nada más del archivo. Cuando termines, enséñame la sección añadida y no hagas nada más.

```
**Qué salió:**
Se modificó el archivo Claude.md con las nuevas reglas de proceso.

## Prompt 12

**Modelo:** — (no aplica: comando lanzado a mano)
**Herramienta:** Windows PowerShell (ventana aparte, en C:\Users\chrme)
**Repo:** ninguno (me equivoqué de carpeta)

```
git config core.symlinks true
```

**Qué salió:**
Falló con `fatal: not in a git directory`, porque lo ejecuté en mi carpeta de usuario y no dentro del repo. Antes había activado el Modo de desarrollador de Windows (Configuración → Sistema → Avanzado) para poder crear enlaces simbólicos.

## Prompt 13

**Modelo:** — (no aplica: comandos lanzados a mano)
**Herramienta:** PowerShell (terminal de VS Code)
**Repo:** flowsync-ai4devs-202610-seniors-I

```
git config core.symlinks true
Remove-Item AGENTS.md
New-Item -ItemType SymbolicLink -Path AGENTS.md -Target CLAUDE.md
```

**Qué salió:**
`git config` funcionó dentro del repo y `Remove-Item` borró la copia antigua de AGENTS.md (estaba adaptada para Codex y desactualizada). Pero `New-Item` falló con `Se necesitan privilegios de administrador para esta operación` (NewItemSymbolicLinkElevationRequired): Windows PowerShell 5.1 pide ser administrador para crear enlaces simbólicos aunque el Modo de desarrollador esté activo.

## Prompt 14

**Modelo:** — (no aplica: comando lanzado a mano)
**Herramienta:** PowerShell (terminal de VS Code)
**Repo:** flowsync-ai4devs-202610-seniors-I

```
cmd /c mklink AGENTS.md CLAUDE.md
```

**Qué salió:**
Funcionó: `vínculo simbólico creado para AGENTS.md <<===>> CLAUDE.md`. `mklink` sí respeta el Modo de desarrollador. Ahora AGENTS.md es un enlace a CLAUDE.md (equivale al `ln -s CLAUDE.md AGENTS.md` del enunciado), así que las otras herramientas leen las mismas instrucciones, incluidas las Process rules de la pieza 7.
