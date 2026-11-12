import Link from 'next/link';

export function Footer() {
  const currentYear = 2026;

  return (
    <footer className="bg-neutral-950 text-neutral-400 border-t border-neutral-900 py-14">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Logo e Apresentação */}
          <div className="md:col-span-2">
            <Link href="/" className="inline-block text-xl font-black tracking-wider text-white">
              BARBEARIA <span className="text-amber-500">LUZ</span>
            </Link>
            <p className="mt-3 text-xs sm:text-sm text-neutral-400 max-w-sm leading-relaxed font-light">
              Tradição, estilo e cuidados masculinos de alto nível no Bairro da Luz, Nova Iguaçu - RJ. Barbearia climatizada, estúdio de tattoo e academia de barbeiros.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-900 text-amber-400 text-xs font-bold border border-neutral-800">
                ⭐ 4.9 no Google (+160 avaliações)
              </span>
              <span className="text-xs text-neutral-500 font-medium">Bairro da Luz • Nova Iguaçu</span>
            </div>
          </div>

          {/* Links Rápidos */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3.5">
              Navegação
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#servicos" className="hover:text-amber-400 transition-colors">
                  17 Serviços & Preços
                </a>
              </li>
              <li>
                <a href="#barbeiros" className="hover:text-amber-400 transition-colors">
                  Equipe de Barbeiros
                </a>
              </li>
              <li>
                <a href="#avaliacoes" className="hover:text-amber-400 transition-colors">
                  Depoimentos Reais
                </a>
              </li>
              <li>
                <a href="#estudio-e-academia" className="hover:text-amber-400 transition-colors">
                  Tattoo Studio & Academia
                </a>
              </li>
              <li>
                <a href="#localizacao" className="hover:text-amber-400 transition-colors">
                  Rua Barão de São Félix
                </a>
              </li>
              <li>
                <Link href="/agendar" className="text-amber-400 hover:text-amber-300 font-bold transition-colors">
                  Agendar Horário Online →
                </Link>
              </li>
            </ul>
          </div>

          {/* Contato Direto & Redes */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3.5">
              Contatos Oficiais
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a
                  href="https://wa.me/5521980134488"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-emerald-400 transition-colors"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span><strong>Barbearia:</strong> (21) 98013-4488</span>
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/5521992286447"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-emerald-400 transition-colors"
                >
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  <span><strong>Tattoo:</strong> (21) 99228-6447</span>
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-pink-400 transition-colors"
                >
                  Instagram: @barbearialuz
                </a>
              </li>
              <li className="text-neutral-500 pt-1 text-[11px] leading-relaxed">
                Rua Barão de São Félix — Bairro da Luz, Nova Iguaçu - RJ
              </li>
            </ul>
          </div>
        </div>

        {/* Linha Inferior com Copyright */}
        <div className="pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>© {currentYear} Barbearia Luz. Todos os direitos reservados.</p>
          <p className="text-neutral-600">Tradição e modernidade no Bairro da Luz.</p>
        </div>
      </div>
    </footer>
  );
}
