export default function Footer() {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} City of Malgudi — Job Profile Directory</p>
      <p style={{ marginTop: '0.25rem' }}>
        Powered by <a href="#">Municipal HR Services</a> · All rights reserved
      </p>
    </footer>
  );
}
