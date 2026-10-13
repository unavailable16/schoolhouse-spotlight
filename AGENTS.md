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

- Keep shared school navigation and footer in `site-chrome.tsx` so every public page stays consistent.
- Keep homepage carousel behavior in a dedicated component because it owns client-side timing and controls.
- Keep the uploaded website's media as CDN asset pointers so source imports stay lightweight.
- Keep imported school collections as bundled baseline content with Cloud overrides; server functions project public posts and verify database admin roles before every write, replacing the uploaded filesystem API.
