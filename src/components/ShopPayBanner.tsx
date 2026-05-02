export default function ShopPayBanner() {
  return (
    <section className="text-white py-3" style={{ background: 'linear-gradient(90deg, #4A4FCC 0%, #2E8899 100%)' }}>
      <div className="container-main flex flex-col sm:flex-row items-center justify-between gap-2 text-sm">
        <p className="font-medium">
          💳 Pay in 4 interest-free instalments with <span className="font-extrabold">ZikkyPay</span>
        </p>
        <span className="text-xs bg-white/20 rounded-full px-3 py-1">Available at checkout</span>
        <p className="text-xs text-white/70 hidden md:block">
          Orders ₦15,000–₦300,000 · No credit checks · Instant approval
        </p>
      </div>
    </section>
  );
}
