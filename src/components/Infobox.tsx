import React from 'react';
import Icon from './Icon';

export interface InfoboxProps {
  title?: string;
  subtitle?: string;
  type?: string; // 'mob' | 'item' | 'block' | 'structure' або довільний текст
  image?: string;
  icon?: string;
  caption?: string;
  children?: React.ReactNode;
  [key: string]: any; // Дозволяє передавати будь-які характеристики (hp, drops, damage тощо)
}

// Словник автоматичного перекладу ключів атрибутів українською
const knownLabels: Record<string, string> = {
  hp: 'Здоров\'я',
  health: 'Здоров\'я',
  damage: 'Ушкодження',
  drops: 'Дроп',
  spawn: 'Спавн',
  stack: 'Стек',
  tool: 'Інструмент',
  hardness: 'Міцність',
  rarity: 'Рідкісність',
  renewable: 'Відновлюваний',
  behavior: 'Поведінка',
  dimension: 'Вимір',
  type: 'Тип',
};

export default function Infobox({
  title,
  subtitle,
  type,
  image,
  icon,
  caption,
  children,
  ...restAttrs
}: InfoboxProps) {
  // Фільтруємо динамічні атрибути для створення рядків таблиці
  const dynamicRows = Object.entries(restAttrs).filter(
    ([key, val]) =>
      val !== undefined &&
      val !== null &&
      val !== '' &&
      !['key', 'className', 'style'].includes(key)
  );

  return (
    <aside className="infobox my-4 md:float-right md:ml-6 md:mb-6 w-full md:w-80 clear-right z-10 border-2 border-[#c5629a] bg-[#130217]">
      {/* Заголовок Інфобоксу */}
      {(title || subtitle || type) && (
        <div className="bg-[#1f0d22] p-3 text-center border-b-2 border-[#4a1f38]">
          <div className="flex items-center justify-center gap-2">
            {icon && <Icon name={icon} size={24} />}
            {title && (
              <h3 className="minecraftFont text-xl font-bold text-[#f390d0] leading-tight">
                {title}
              </h3>
            )}
          </div>
          {(subtitle || type) && (
            <span className="inline-block mt-1.5 text-[10px] minecraftFont uppercase tracking-widest text-[#c5629a] bg-[#0a0a12] px-2 py-0.5 border border-[#4a1f38]">
              {subtitle || type}
            </span>
          )}
        </div>
      )}

      {/* Картинка / Текстура предмета або моба */}
      {image && (
        <div className="p-4 bg-[#0a0a12] border-b-2 border-[#4a1f38] flex flex-col items-center justify-center">
          <img
            src={image}
            alt={title || 'Infobox'}
            className="max-h-56 w-auto object-contain"
            style={{ imageRendering: 'pixelated' }}
          />
          {caption && (
            <p className="mt-2 text-center text-xs text-gray-400 italic">
              {caption}
            </p>
          )}
        </div>
      )}

      {/* Динамічна таблиця атрибутів */}
      {dynamicRows.length > 0 && (
        <table className="w-full text-xs text-left border-collapse">
          <tbody>
            {dynamicRows.map(([key, val], index) => {
              const labelText = knownLabels[key.toLowerCase()] || key;
              return (
                <tr
                  key={key}
                  className={`border-b border-[#4a1f38] ${
                    index % 2 === 0 ? 'bg-[#1a0f1f]' : 'bg-[#0a0a12]/60'
                  }`}
                >
                  <td className="p-2.5 font-bold text-[#f390d0] minecraftFont uppercase border-r-2 border-[#4a1f38] w-[38%] align-top">
                    {labelText}
                  </td>
                  <td className="p-2.5 text-[#f0d4e6] leading-snug align-top">
                    {String(val)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

      {/* Вкладений вміст (якщо всередині тегу <Infobox> передали свій HTML чи Markdown) */}
      {children && <div className="p-2 text-xs text-[#f0d4e6]">{children}</div>}
    </aside>
  );
}