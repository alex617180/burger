export default function IngredientDetails({ ingredient }) {
    if (!ingredient) return null;

    const {
        name,
        image_large,
        image,
        proteins,
        fat,
        carbohydrates,
        calories,
        description = 'Пока без описания'
    } = ingredient;

    return (
        <div className="flex flex-col items-center text-center text-white">
            <div className="relative mb-8 flex h-82 w-82 items-center justify-center rounded-full">
                <div className="absolute inset-[18%] rounded-full bg-[#1C1C28]" />
                <img
                    src={image_large || image}
                    alt={name}
                    className="relative h-74 w-74]"
                />
            </div>

            <h3 className="text-2xl font-semibold text-white">{name}</h3>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-neutral-300">
                {description}
            </p>

            <ul className="mt-10 flex w-full flex-wrap items-center justify-between gap-6 border-t border-white/10 pt-6 text-sm uppercase tracking-[0.12em] text-neutral-400">
                <InfoItem label="Калории, ккал" value={calories} />
                <InfoItem label="Белки, г" value={proteins} />
                <InfoItem label="Жиры, г" value={fat} />
                <InfoItem label="Углеводы, г" value={carbohydrates} />
            </ul>
        </div>
    );
}

function InfoItem({ label, value }) {
    return (
        <li className="flex w-full flex-col gap-2 text-center sm:w-auto">
            <span>{label}</span>
            <span className="text text_type_digits-default">{value}</span>
        </li>
    );
}
