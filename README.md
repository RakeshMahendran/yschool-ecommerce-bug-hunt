# Y-School Demo Store — E-Commerce Bug Hunt

A small, realistic online shop built for the **Y-School AI Agents workshop**. You will run the store on your own laptop, build an AI browser-testing agent (Python + Playwright + an LLM), point the agent at the store and let it hunt for defects.

The store sells 12 fictional products in three categories, with search, filters, a shopping cart, coupons, shipping rules and a simulated checkout. Everything runs locally: there is no backend, no login, no real payment and no network dependency once dependencies are installed.

> **Heads-up:** like a lot of real software, this store is not perfect. Finding out where it misbehaves is your job. Use [REQUIREMENTS.md](REQUIREMENTS.md) as the source of truth for how it is _supposed_ to behave.

---

## Prerequisites

| Tool    | Version                    | Check with      |
| ------- | -------------------------- | --------------- |
| Node.js | 18.18 or newer (20 / 22 LTS recommended) | `node -v` |
| npm     | 9 or newer (ships with Node) | `npm -v`      |
| Git     | any recent version          | `git --version` |

Download Node.js LTS from <https://nodejs.org> if needed. On Windows, use the default installer options and reopen your terminal afterwards.

For the agent part of the workshop you will also need Python 3.10+; your instructor will share those steps separately.

## Quick start

```bash
git clone https://github.com/RakeshMahendran/yschool-ecommerce-bug-hunt.git
cd yschool-ecommerce-bug-hunt
npm ci
npm run dev
```

Open **<http://localhost:5173>** in your browser. You should see the "Shop all products" page with 12 product cards.

Stop the server with `Ctrl + C` in the terminal.

### Other scripts

| Command           | What it does                                          |
| ----------------- | ----------------------------------------------------- |
| `npm run dev`     | Start the development server on port 5173             |
| `npm run build`   | Type-check and build a production bundle into `dist/` |
| `npm run preview` | Serve the production build on <http://localhost:4173> |

## Using the store

| Page                 | URL                       |
| -------------------- | ------------------------- |
| Shop / catalogue     | `/`                       |
| Product details      | `/products/<product-id>`  |
| Cart                 | `/cart`                   |
| Checkout             | `/checkout`               |
| Order confirmation   | `/order/<order-id>`       |

- Search, category and sort settings are reflected in the URL (for example `/?category=Fashion&sort=price-desc`), so an agent can navigate straight to a filtered view.
- The cart and placed orders are saved in the browser's `localStorage`.
- **Reset Demo Data** (top-right of every page) wipes the cart and order history and reloads the shop, so every test can start from the same clean state. From a script you can do the same with `localStorage.clear()` followed by a page reload.
- The coupon code advertised on the home page is `SAVE10`.

## Workshop challenge

> You've joined a QA engineering team. Your company has given you an e-commerce application to test. Your task is to build an AI agent capable of exploring the application, validating its functionality against the requirements, and producing evidence-backed bug reports.

**Ground rule: test through the browser only.** Treat the store as a black box. Don't read or search the files under `src/` to find problems. Every bug you report must be found and reproduced through the website itself.

1. Get the store running locally and explore it by hand for a few minutes. Read [REQUIREMENTS.md](REQUIREMENTS.md).
2. Build an AI testing agent with Python, Playwright and a free LLM API. Give it the ability to open pages, read what is on screen, click, type and select.
3. Decide for yourself what to test. Turn the requirements into test scenarios and give your agent one feature at a time.
4. Watch the browser as the agent works. Compare what the store does with what REQUIREMENTS.md says it should do.
5. For every defect you find, have your agent (or you) write a bug report containing:
   - **Title** — one line describing the problem
   - **Feature / page**
   - **Preconditions** (e.g. "fresh state after Reset Demo Data")
   - **Steps to reproduce** — numbered and exact
   - **Expected result** — quote the requirement
   - **Actual result** — what you observed, with values
   - **Severity** — Critical / High / Medium / Low
   - **Evidence** — screenshot path or Playwright assertion that fails
6. Reset the demo data between scenarios so one test does not affect another.

**Goal:** find as many genuine, reproducible defects as you can. Quality of the bug report counts as much as the number of bugs.

### Tips for writing your agent

- Prefer stable locators: `get_by_role`, `get_by_label` and `get_by_test_id` all work well here. Key `data-testid` values are listed in REQUIREMENTS.md.
- Start each scenario from a clean state: open `/`, click **Reset Demo Data** (or clear `localStorage` and reload).
- Ask the LLM to state the expected result _before_ acting, then check the actual result afterwards.
- Read prices from the page as text (e.g. `₹1,999`) and convert them to numbers before comparing.
- Keep the agent focused: one feature per run produces clearer reports.

## Troubleshooting

| Problem | Fix |
| ------- | --- |
| `npm ci` says the lock file is missing or out of sync | Make sure you are inside the `yschool-ecommerce-bug-hunt` folder and have not edited `package.json`. Re-clone if in doubt. |
| `'npm' is not recognized` (Windows) | Node.js is not installed or the terminal was opened before installing. Install Node LTS and open a new terminal. |
| `Port 5173 is in use` | Another dev server is running. Close the other terminal, or on Windows run `netstat -ano \| findstr :5173` then `taskkill /PID <pid> /F`. The port is fixed on purpose so every student's agent uses the same URL. |
| PowerShell blocks `npm` scripts ("running scripts is disabled") | Run `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` once, or use Command Prompt / Git Bash instead. |
| Corporate / college proxy blocks `npm ci` | Ask your instructor for the offline bundle, or configure `npm config set proxy ...`. |
| The page looks stuck in an odd state | Click **Reset Demo Data**, or open DevTools → Application → Local Storage and delete the `yschool-*` keys. |
| Blank page | Check the terminal for errors, then hard-refresh the browser (`Ctrl + Shift + R`). |
| `localhost` does not resolve | Try <http://127.0.0.1:5173>. |

## Disclaimer

All products, prices and orders are fictional, and no payment is ever taken. The store itself runs entirely on your machine and sends no data anywhere. **Your AI agent is different:** if it uses a cloud LLM API (for example Gemini or Groq), the page content, screenshots and test data it sends are sent to that provider. Use only the fictional demo data, and don't paste personal information or API keys into prompts.
