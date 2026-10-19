---
name: commit
description: Crea un commit convencional en español (tipo(scope): descripción) a partir de los cambios ya preparados con git add. Usar cuando el usuario invoque /commit o pida commitear lo que tiene en staging.
disable-model-invocation: true
allowed-tools: Bash(git diff --staged*), Bash(git status*), Bash(git commit*), Bash(git log*)
---

# /commit

Crea un commit a partir **solo** de los cambios que el usuario ya ha preparado.

## Pasos

1. Ejecuta `git diff --staged` (y si hace falta `git diff --staged --stat` para ver el resumen de ficheros).
   - Si la salida está vacía, responde que no hay cambios preparados y **termina**. No hagas nada más.
2. Analiza el diff y redacta un mensaje de commit convencional con el formato:

   ```
   tipo(scope): descripción
   ```

   - **tipo**: uno de `feat`, `fix`, `docs`, `refactor`, `test`, `chore`, `style`.
   - **scope**: la parte del proyecto afectada, por ejemplo `frontend`, `backend`, `harness`, `docs`.
   - **descripción**: en español, en minúscula, en imperativo (por ejemplo "añade", "corrige", "elimina") y **sin punto final**.
   - Puedes añadir un cuerpo breve tras una línea en blanco si el cambio lo necesita.
3. Muestra el mensaje propuesto y haz el commit con él:

   ```bash
   git commit -m "tipo(scope): descripción"
   ```

4. Muestra el resultado del commit (hash y mensaje).

## Restricciones

- **No** ejecutes `git add` ni ningún otro comando que modifique el staging: solo se commitea lo que el usuario haya preparado.
- **No** ejecutes `git push`.
- No uses `-a` ni `--all` en `git commit`: añadirían al commit cambios no preparados.
- No uses `--amend`, `--no-verify` ni opciones que salten hooks.
- No añadas la línea Co-Authored-By
