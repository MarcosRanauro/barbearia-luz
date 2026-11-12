import Link from 'next/link';

export function Footer() {
  const currentYear = 2026;

  return (
    <footer className="bg-neutral-950 text-neutral-400 border-t border-neutral-900 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Logo e Apresentação */}
          <div className="md:col-span-2">
            <Link href="/" className="inline-block text-xl font-black tracking-wider text-white">
              BARBEARIA <span className="text-amber-500">LUZ</span>
            </Link>
            <p className="mt-3 text-xs sm:text-sm text-neutral-400 max-w-sm leading-relaxed">
              Tradição, estilo e excelência em cuidados masculinos e arte corporal no Bairro da Luz, Nova Iguaçu - RJ.
            </p>
            <div className="mt-4 flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-neutral-900 text-amber-400 text-xs font-semibold border border-neutral-800">
                ★ 4.9 no Google
              </span>
              <span className="text-xs text-neutral-500">+160 clientes atendidos</span>
            </div>
          </div>

          {/* Links Rápidos */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Navegação
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#servicos" className="hover:text-amber-400 transition-colors">
                  Serviços & Preços
                </a>
              </li>
              <li>
                <a href="#barbeiros" className="hover:text-amber-400 transition-colors">
                  Nossos Barbeiros
                </a>
              </li>
              <li>
                <a href="#tatuagem" className="hover:text-amber-400 transition-colors">
                  Estúdio de Tattoo
                </a>
              </li>
              <li>
                <a href="#localizacao" className="hover:text-amber-400 transition-colors">
                  Onde Estamos
                </a>
              </li>
              <li>
                <Link href="/agendar" className="text-amber-400 hover:text-amber-300 font-semibold transition-colors">
                  Agendar Online →
                </Link>
              </li>
            </ul>
          </div>

          {/* Contato Direto */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Contato & Redes
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="https://wa.me/5521999990001"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-emerald-400 transition-colors"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  WhatsApp: (21) 99999-0001
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
              <li className="text-neutral-500 pt-1">
                Bairro da Luz, Nova Iguaçu - RJ
              </li>
            </ul>
          </div>
        </div>

        {/* Linha Inferior com Copyright */}
        <div className="pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>© {currentYear} Barbearia Luz. Todos os direitos reservados.</p>
          <p className="text-neutral-600">Desenvolvido com excelência técnica para o Bairro da Luz.</p>
        </div>
      </div>
    </footer>
  );
}
