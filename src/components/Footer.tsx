import { STORE_NAME } from '../data/store';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <p>{STORE_NAME} · A practice store for the Y-School AI testing workshop. No real orders or payments.</p>
      </div>
    </footer>
  );
}
