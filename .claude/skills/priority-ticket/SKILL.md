---
name: priority-ticket
description: Busca en Jira (proyecto FlowSync, vía el MCP de Atlassian) el ticket de mayor prioridad asignado al usuario en estado «Por hacer», lo resume, propone un plan de implementación en plan mode tras leer el código real y, solo cuando el plan se aprueba, mueve el ticket a «En curso». Usar cuando el usuario invoque /priority-ticket o pida "el siguiente ticket prioritario".
disable-model-invocation: true
---

# /priority-ticket

Flujo para tomar el ticket más prioritario de FlowSync y planificar su implementación.

## Reglas estrictas

- **No escribir ni modificar código** y **no mover el ticket** antes de que el usuario apruebe el plan.
- Si no hay ningún ticket que cumpla el filtro, informarlo y **terminar** (sin plan mode, sin más acciones).
- El backend no se modifica en este ejercicio (ver `CLAUDE.md`); el plan trabaja sobre `frontend/`.

## Paso 1 — Obtener el ticket de Jira

Usar las herramientas del MCP de Atlassian (`mcp__claude_ai_Atlassian_MCP__*` o `mcp__atlassian__*`, según cuál esté disponible; cargarlas con ToolSearch si están diferidas). Si el MCP no está autenticado, decírselo al usuario (debe autorizarlo con `/mcp`) y terminar.

1. Obtener el `cloudId` con `getAccessibleAtlassianResources` (una sola vez).
2. Buscar con `searchJiraIssuesUsingJql` usando esta JQL:

   ```
   project = "FlowSync" AND assignee = currentUser() AND status = "Por hacer" ORDER BY priority DESC, created ASC
   ```

   - Pedir `maxResults: 1` y los campos `summary`, `description`, `priority`, `status`, `issuetype`.
   - Si la JQL falla porque el proyecto se identifica por clave, localizar la clave del proyecto FlowSync y reintentar una vez con `project = <CLAVE>`.
3. Si no hay resultados: responder "No hay tickets en «Por hacer» asignados a ti en FlowSync." y **finalizar**.
4. Si hay resultado, obtener el detalle completo con `getJiraIssue` (descripción y criterios de aceptación, incluidos campos personalizados si los criterios están ahí).

## Paso 2 — Mostrar el ticket

Presentar al usuario:

- **Ticket**: clave y enlace (p. ej. `FS-12`).
- **Título**: el `summary`.
- **Prioridad** y tipo.
- **Criterios de aceptación**: resumen breve en viñetas. Si el ticket no tiene criterios explícitos, indicarlo y resumir la descripción.

## Paso 3 — Plan mode y propuesta

1. Entrar en plan mode con `EnterPlanMode` (cargarla con ToolSearch si está diferida).
2. **Leer el código real antes de proponer** (solo lectura):
   - `CLAUDE.md` para el contexto del repo.
   - El estado actual de `frontend/` (`package.json`, `src/`, config de Vite/TS, componentes shadcn/ui si existen).
   - El contrato del backend que toque el ticket: `backend/start/routes.ts`, controladores, `backend/app/validators/` (el contrato real, con campos que el ticket puede no mencionar), transformers y `providers/api_provider.ts` (forma `{ data: ... }`).
3. Proponer el plan con `ExitPlanMode`, incluyendo:
   - Cómo cubre cada criterio de aceptación.
   - Archivos a crear/modificar.
   - Detalles del contrato de API relevantes (campos obligatorios, errores 400/422, auth Bearer).
   - Cómo se verificará (`npm run build`, `npm run lint`, prueba manual).

## Paso 4 — Tras la aprobación

- **Solo si el usuario aprueba el plan**:
  1. Mover el ticket a «En curso»: obtener las transiciones disponibles (`getTransitionsForJiraIssue` vía `discover`/`executeRead` si no es herramienta primaria), elegir la que lleva a «En curso» y aplicarla con `transitionJiraIssue`.
  2. Confirmar al usuario que el ticket está en «En curso».
  3. A continuación, implementar el plan aprobado.
- Si el usuario rechaza o pide cambios, ajustar el plan y volver a proponerlo; el ticket se queda en «Por hacer».
