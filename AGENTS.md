<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

# Project rules

- Reports are stored in the browser (in-memory store persisted to localStorage, `src/lib/reports.ts`) with photos as data URLs — hackathon prototype, persistence intentionally not on the backend.
- No login anywhere; the admin view is an open route — the user explicitly asked for no auth.
- Status badge colors come from `--status-*` tokens in `src/styles.css`; the orange call-to-action uses the `cta` button variant.
