export default function OrderDetails({ orderData }) {

  return (
    <section className="flex flex-col items-center gap-6 px-6 py-10 text-center text-white sm:px-10">
      <p className="text text_type_digits-large">
        {orderData?.number ?? 0}
      </p>

      <p className="text-base uppercase tracking-[0.45em] text-white/70 sm:text-lg">
        идентификатор заказа
      </p>

      <div className="relative flex h-28 w-28 items-center justify-center">
        <span className="absolute inset-0 rounded-full bg-sky-500/25 blur-2xl"></span>
        <span className="absolute inset-2 rounded-full bg-[#14141f] ring-1 ring-sky-500/40"></span>
        <span className="relative flex h-full w-full items-center justify-center rounded-full bg-sky-500/15 ring-1 ring-sky-400/40">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-10 w-10 text-sky-300 drop-shadow-[0_0_16px_rgba(87,149,255,0.55)]"
          >
            <polyline points="5 13 10 18 19 9" />
          </svg>
        </span>
      </div>

      <div className="space-y-2 text-base text-white/80">
        <p>Ваш заказ начали готовить</p>
        <p className="text-sm text-white/50">
          Дождитесь готовности на орбитальной станции
        </p>
      </div>
    </section>
  );
}
