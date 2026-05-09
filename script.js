
    <!-- Inicialização de Alto Contraste via LocalStorage -->
    <script>
        if (localStorage.getItem('contrast') === 'high') {
            document.body.classList.add('high-contrast');
        }
    </script>

        if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        
        if (localStorage.getItem('dyslexic') === 'true') {
            document.documentElement.classList.add('font-dyslexic');
        }
        tailwind.config = {
            darkMode: 'class', // Ativa Dark Mode via classe
            theme: {
                extend: {
                    colors: {
                        hc: { bg: '#000000', text: '#FFFF00', link: '#00FFFF', border: '#FFFFFF' }
                    }
                }
            }
        }



        lucide.createIcons();
        new window.VLibras.Widget('https://vlibras.gov.br/app');

        // FUNÇÃO DE ATIVAÇÃO DO VLIBRAS
        function toggleVLibras() {
            const evt = new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
                view: window
            });
            const vlibrasButton = document.querySelector('[vw-access-button]');
            if (vlibrasButton) {
                vlibrasButton.dispatchEvent(evt);
            }
        }

        // ==========================================
        // 1. SISTEMA DE ROTAS (SPA) E VOLTAR AO TOPO
        // ==========================================
        function nav(pageId) {
            document.querySelectorAll('.page-section').forEach(el => el.classList.remove('active'));
            const newPage = document.getElementById('page-' + pageId);
            newPage.classList.add('active');
            
            // 🔊 🔊 CANCELA O ÁUDIO AO MUDAR DE PÁGINA (ACESSIBILIDADE PARA CEGOS)
            if('speechSynthesis' in window) {
                window.speechSynthesis.cancel();
                if(typeof isReadingPage !== 'undefined' && isReadingPage) {
                    isReadingPage = false;
                    updateReadButton(false);
                }
            }
            
            document.querySelectorAll('.nav-btn').forEach(btn => {
                btn.classList.remove('bg-white/20', 'dark:bg-slate-800');
                if(btn.innerText.toLowerCase().includes(pageId) || 
                  (pageId==='home' && btn.innerText.includes('Início')) ||
                  (pageId==='ia' && btn.innerText.includes('IA')) ||
                  (pageId==='referencias' && btn.innerText.includes('Referências')) ) {
                    btn.classList.add('bg-white/20');
                }
            });
            window.scrollTo(0, 0);

            // GESTÃO DE FOCO (SPA Acessibilidade) - Move o foco para o título da nova secção
            const headingToFocus = newPage.querySelector('h1, h2');
            if (headingToFocus) {
                headingToFocus.setAttribute('tabindex', '-1');
                headingToFocus.focus();
            }
        }

        // Mostrar / Esconder botão "Voltar ao Topo"
        window.addEventListener('scroll', () => {
            const btn = document.getElementById('back-to-top');
            if (window.scrollY > 300) {
                btn.classList.remove('opacity-0', 'pointer-events-none');
                btn.classList.add('opacity-100', 'pointer-events-auto');
            } else {
                btn.classList.remove('opacity-100', 'pointer-events-auto');
                btn.classList.add('opacity-0', 'pointer-events-none');
            }
        });

        // ==========================================
        // 2. DADOS: TABELA COMPARATIVA E PROMPTS
        // ==========================================
        const criterios = [
            { c: "Licença / Preço", livre: "🟢 100% Gratuito. A 'receita' é aberta.", pago: "🔴 Exige compra de licença dispendiosa ou assinatura." },
            { c: "Segurança", livre: "🟢 Muito seguro. Falhas são detetadas e corrigidas rápido.", pago: "🔴 Alvo principal de Hackers e vírus a nível mundial." },
            { c: "Uso em PCs Antigos", livre: "🟢 Salvam máquinas antigas. Gastam pouca RAM e CPU.", pago: "🔴 Pesados, exigem PCs modernos e dispendiosos." },
            { c: "Software Profissional", livre: "🟡 Tem alternativas grátis (GIMP, LibreOffice), mas não roda Adobe oficial.", pago: "🟢 Padrão da indústria criativa. Roda tudo." },
            { c: "Drivers (Impressoras)", livre: "🟡 Placas muito recentes podem dar algumas dores de cabeça no início.", pago: "🟢 Suporte total pelas fabricantes. Plug and play." }
        ];
        const tabBody = document.getElementById('tabela-corpo');
        criterios.forEach(item => {
            tabBody.innerHTML += `<tr class="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 transition">
                <td class="p-3 sm:p-4 font-bold align-top">${item.c}</td><td class="p-3 sm:p-4 text-emerald-700 dark:text-emerald-400 font-medium align-top">${item.livre}</td><td class="p-3 sm:p-4 text-rose-700 dark:text-rose-400 font-medium align-top">${item.pago}</td></tr>`;
        });

        const promptsTCC = [
            "Vamos melhorar mais, coloque um dark mode, mais paginas, mais acessibilidades... adicione um simulador do terminal do linux e do windows.",
            "Adicione mais perguntas ao quiz, no botao de vlibras coloque um icone para surdo, mais imagens para a galeria de interfaces.",
            "Na ia que criamos, ao inves de responder qualquer pergunta ela deve responder so os prompts utilizaveis por mim, so pra pessoa ver como esse projeto foi feito.",
            "Na galeria virtual, quero adicionar que quando a pessoa apertar em algum da galeria abre um modal com alguma explicacao mais detalhada.",
            "Lembrando que a maioria das pessoas que iriam usar o site, nao possuem conhecimento tecnico. (Adaptação para linguagem leiga e analogia dos carros).",
            "Quero adicionar isso: 1. Persistência de Preferências (LocalStorage) 2. Referências Bibliográficas 3. Gestão de Foco no Modal 4. Botão Voltar ao Topo.",
            "Na parte 'A Voz dos Utilizadores' eu gostaria que estivesse a opniao de alguem que realmente exista, como Bill Gates, Elon Musk e Steve Jobs.",
            "Faça a responsividade para celular.",
            "E se o mudo tiver braço como funcionara a acessibilidade? e se o mudo nao tiver braço como funcionara a acessibilidade? (Discussão sobre Eye Tracking e hardware assistivo).",
            "Quero deixar 200% e outra coisa esse projeto possui todo o conteudo abaixo, do que ele precisa ter? [Análise e validação do roteiro completo do TCC com os 12 critérios].",
            "Na galeria visual: coloque a imagem do simbolo oficial de cada sistema operacional (windows 11, ubuntu, etc).",
            "Crie uma simulação funcional de terminal triplo (Linux Ubuntu vs Windows CMD vs macOS) e um 'Cheat Sheet' com os principais comandos.",
            "Fazer uma simulaçao funcional de desktop visual (windows vs ubuntu vs MacOS vs linux mint).",
            "Na pagina IA prompts: na parte Relatório de Transparência (Prompts Usados) eu preciso adicionar todos os prompts q eu utilizei para fazer todo o projeto.",
            "mas como a pessoa cega vai encontrar o botao? tinha q ser algo automatico nao é? e depois a pessoa desabilita caso na precise (Implementação do atalho Global Alt + L para acessibilidade).",
            "o vlibras nao esta funcionando eu aperto o botao e nao acontece nada (Correção de eventos Vue e ajuste do ícone quebrado do botão flutuante)"
        ];
        
        const promptList = document.getElementById('lista-prompts');
        promptsTCC.forEach(p => {
            promptList.innerHTML += `<li class="bg-slate-50 dark:bg-slate-900 p-3 sm:p-4 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-xs sm:text-sm text-slate-700 dark:text-slate-300 shadow-sm flex items-start gap-2 sm:gap-3"><i data-lucide="terminal" class="w-4 h-4 mt-0.5 text-blue-500 shrink-0"></i> <span>${p}</span></li>`;
        });

        // ==========================================
        // 3. ACESSIBILIDADE E DARK MODE (COM LOCALSTORAGE)
        // ==========================================
        let currentFontSize = 16;
        function changeFontSize(step) {
            currentFontSize += step * 2;
            if(currentFontSize >= 12 && currentFontSize <= 24) document.documentElement.style.fontSize = currentFontSize + 'px';
        }
        
        function toggleDarkMode() { 
            const html = document.documentElement;
            html.classList.toggle('dark'); 
            // Guarda preferência
            localStorage.setItem('theme', html.classList.contains('dark') ? 'dark' : 'light');
        }
        
        function toggleHighContrast() { 
            const body = document.body;
            body.classList.toggle('high-contrast'); 
            // Guarda preferência
            localStorage.setItem('contrast', body.classList.contains('high-contrast') ? 'high' : 'normal');
        }

        function toggleDyslexicFont() {
            const html = document.documentElement;
            html.classList.toggle('font-dyslexic');
            localStorage.setItem('dyslexic', html.classList.contains('font-dyslexic') ? 'true' : 'false');
        }
        
        function readText(...ids) {
            if('speechSynthesis' in window) {
                window.speechSynthesis.cancel();
                let txt = ids.map(id => document.getElementById(id)?.innerText || '').join('. ');
                let u = new SpeechSynthesisUtterance(txt);
                u.lang = 'pt-BR'; // Mudado para Português do Brasil
                window.speechSynthesis.speak(u);
            }
        }

        // ====================================================================================================
        // 🔊 🔊 🔊 INÍCIO DO CÓDIGO DE ACESSIBILIDADE PARA CEGOS (ASSISTENTE DE VOZ NATIVA) 🔊 🔊 🔊
        // ====================================================================================================
        // Todo o código abaixo é responsável por fazer o navegador falar.
        // Ele usa a "Web Speech API" (speechSynthesis) que já vem embutida no Chrome, Edge, Safari, etc.
        
        let isReadingPage = false;  // Variável para saber se o robô está falando no momento
        let readingChunks = [];     // Lista de pedaços de texto (para a voz não engasgar lendo tudo de uma vez)
        
        // FUNÇÃO 1: Ativada quando o usuário clica no botão "Ouvir Tudo" ou usa o ATALHO ALT + L
        function readFullPage() {
            // Verifica se o navegador tem suporte a voz
            if (!('speechSynthesis' in window)) {
                alert("Desculpe, o seu navegador não suporta leitura de voz.");
                return;
            }
            
            // Se já estiver lendo, serve para PARAR a leitura
            if (isReadingPage || window.speechSynthesis.speaking) {
                window.speechSynthesis.cancel();
                isReadingPage = false;
                updateReadButton(false); // Volta o botão para verde "Ouvir Tudo"
                return;
            }

            // Acha qual é a página que está aberta no momento (Início, Comparativo, etc)
            const activeSection = document.querySelector('.page-section.active');
            if (!activeSection) return;

            // Pega TODO o texto visível da página
            const rawText = activeSection.innerText;
            
            // Corta o texto enorme em pedaços menores baseados nas quebras de linha.
            // Isso evita que a voz trave ou dê erro de limite de caracteres.
            readingChunks = rawText.split('\n')
                                   .map(t => t.trim())
                                   .filter(t => t.length > 2); // Ignora linhas em branco ou muito curtas

            if (readingChunks.length === 0) return;

            isReadingPage = true;
            updateReadButton(true); // Muda o botão para vermelho "Parar Áudio"
            
            // Fala a primeira frase de aviso
            let startMsg = new SpeechSynthesisUtterance("Iniciando a leitura da página atual.");
            startMsg.lang = 'pt-BR'; // FORÇA O IDIOMA PORTUGUÊS DO BRASIL
            
            // Quando terminar de falar o aviso, começa a ler os blocos de texto
            startMsg.onend = speakNextChunk; 
            
            window.speechSynthesis.speak(startMsg);
        }

        // FUNÇÃO 2: Lê o próximo pedaço de texto da fila
        function speakNextChunk() {
            // Se a leitura foi cancelada ou a lista acabou, para tudo
            if(!isReadingPage || readingChunks.length === 0) {
                isReadingPage = false;
                updateReadButton(false);
                return;
            }
            
            let chunk = readingChunks.shift(); // Pega o primeiro pedaço da fila e remove ele
            let u = new SpeechSynthesisUtterance(chunk);
            u.lang = 'pt-BR'; // FORÇA O IDIOMA PORTUGUÊS DO BRASIL
            u.rate = 1.0;     // Velocidade da voz (1.0 é o normal)
            
            // Evento: Assim que acabar de ler esse pedaço, chama a si mesma para ler o próximo
            u.onend = () => { speakNextChunk(); };
            
            // Evento: Se der erro num pedaço, não trava o site, apenas pula para o próximo
            u.onerror = () => { speakNextChunk(); };
            
            // Manda o navegador falar
            window.speechSynthesis.speak(u);
        }

        // FUNÇÃO 3: Atualiza o ícone e a cor do botão na barra superior
        function updateReadButton(active) {
            const btn = document.getElementById('btn-read-page');
            if (!btn) return;
            if(active) {
                // Modo Lendo: Fica vermelho com botão de "X"
                btn.innerHTML = '<i data-lucide="volume-x" class="w-4 h-4 text-red-400"></i> <span class="hidden sm:inline text-red-400">Parar Áudio</span>';
                btn.classList.replace('text-green-300', 'text-red-400');
            } else {
                // Modo Parado: Fica verde com ícone de volume
                btn.innerHTML = '<i data-lucide="volume-2" class="w-4 h-4"></i> <span class="hidden sm:inline">Ouvir Tudo</span>';
                btn.classList.replace('text-red-400', 'text-green-300');
            }
            lucide.createIcons();
        }

        // FUNÇÃO BÔNUS 1: LEITURA DINÂMICA PELO TECLADO (TAB)
        // Se uma pessoa cega usar o botão TAB para navegar, a assistente lê os botões focados!
        document.addEventListener('focusin', function(e) {
            // Verifica se a leitura completa NÃO está rolando para não atropelar os áudios
            if(!isReadingPage && 'speechSynthesis' in window) {
                const el = e.target;
                // Lê apenas se for um elemento importante (botão, link, input)
                if(el.tagName === 'BUTTON' || el.tagName === 'A' || el.tagName === 'INPUT') {
                    // Pega o nome do botão pelo aria-label (ideal para cegos) ou pelo texto dentro dele
                    let textToRead = el.getAttribute('aria-label') || el.innerText || el.placeholder;
                    if(textToRead) {
                        window.speechSynthesis.cancel(); // Para áudios anteriores
                        let u = new SpeechSynthesisUtterance("Foco em: " + textToRead);
                        u.lang = 'pt-BR'; // Idioma PT-BR
                        u.rate = 1.2; // Lê um pouquinho mais rápido para navegação dinâmica
                        window.speechSynthesis.speak(u);
                    }
                }
            }
        });

        // FUNÇÃO BÔNUS 2: ATALHO INVISÍVEL GLOBAL PARA CEGOS (ALT + L)
        // Permite ligar/desligar a leitura sem precisar achar o botão com o mouse.
        document.addEventListener('keydown', function(e) {
            // Verifica se o usuário apertou a tecla 'Alt' E a letra 'L' ao mesmo tempo
            if (e.altKey && (e.key === 'l' || e.key === 'L')) {
                e.preventDefault(); // Impede que o navegador abra algum menu padrão
                readFullPage();     // Chama a função de leitura
            }
        });
        // ====================================================================================================
        // 🔊 🔊 🔊 FIM DO CÓDIGO DE ACESSIBILIDADE PARA CEGOS 🔊 🔊 🔊
        // ====================================================================================================

        // Navegação por Voz (Annyang)
        let voiceActive = false;
        function toggleVoiceNav() {
            if(!window.annyang) { alert("Navegador não suporta comando de voz."); return; }
            if(voiceActive) {
                annyang.abort(); voiceActive = false;
                document.getElementById('voice-status').classList.add('hidden');
            } else {
                annyang.setLanguage('pt-PT');
                annyang.addCommands({
                    'descer': () => window.scrollBy({top: 400, behavior: 'smooth'}),
                    'subir': () => window.scrollBy({top: -400, behavior: 'smooth'}),
                    'página comparativo': () => nav('comparativo'),
                    'página início': () => nav('home'),
                    'página terminais': () => nav('simulador'),
                    'página inteligência': () => nav('ia'),
                    'página referências': () => nav('referencias'),
                    'modo escuro': () => toggleDarkMode(),
                    'modo dislexia': () => toggleDyslexicFont()
                });
                annyang.start({autoRestart: false});
                voiceActive = true;
                document.getElementById('voice-status').classList.remove('hidden');
            }
        }

        // Verifica Redução de Animações do Utilizador
        function prefersReducedMotion() {
            return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        }

        // ==========================================
        // DADOS E FUNÇÕES DO MODAL DA GALERIA (COM FOCUS TRAP)
        // ==========================================
        const galleryData = {
            'windows': {
                title: 'Microsoft Windows 11',
                icon: 'monitor',
                img: 'https://upload.wikimedia.org/wikipedia/commons/e/e6/Windows_11_logo.svg',
                badges: ['Pago', 'Código Fechado', 'Foco em Jogos'],
                desc: 'O Windows 11 apresenta uma interface centralizada e limpa. É o sistema mais utilizado no mundo em computadores pessoais. A sua principal força é a compatibilidade: quase qualquer programa ou jogo feito para PC funcionará aqui. No entanto, o seu código é trancado a sete chaves (proprietário) e exige hardware cada vez mais recente e poderoso para funcionar perfeitamente.'
            },
            'ubuntu': {
                title: 'Ubuntu (Linux)',
                icon: 'layout-dashboard',
                img: 'https://upload.wikimedia.org/wikipedia/commons/a/ab/Logo-ubuntu_cof-orange-hex.svg',
                badges: ['Gratuito', 'Código Aberto', 'Foco em Programação'],
                desc: 'O Ubuntu utiliza uma interface moderna e intuitiva chamada GNOME. Diferente do mito do "ecrã preto", ele possui uma loja de aplicações visual fácil de usar. É a escolha de eleição dos programadores, pois oferece um ambiente de desenvolvimento idêntico ao dos servidores web (Cloud), garantindo estabilidade incrível e imunidade contra os vírus mais comuns.'
            },
            'macos': {
                title: 'Apple macOS',
                icon: 'apple',
                img: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg',
                badges: ['Pago', 'Proprietário', 'Foco em Design'],
                desc: 'O macOS é o sistema operativo exclusivo dos computadores Mac da Apple. É amplamente reconhecido no mercado pelo seu design polido, ecossistema integrado (onde tudo funciona perfeitamente com iPhone e iPad) e estabilidade robusta. É a plataforma padrão na indústria de design gráfico, edição de vídeo e produção musical. O lado negativo é o seu custo de entrada altíssimo.'
            },
            'mint': {
                title: 'Linux Mint',
                icon: 'leaf',
                img: 'https://upload.wikimedia.org/wikipedia/commons/3/3f/Linux_Mint_logo_without_wordmark.svg',
                badges: ['Gratuito', 'Código Aberto', 'Ideal para Iniciantes'],
                desc: 'Se o utilizador quer abandonar o Windows mas não tem vontade de reaprender a usar o PC, o Linux Mint é a melhor recomendação global. A sua interface (Cinnamon) simula o comportamento clássico com um menu iniciar no canto, barra de tarefas e ícones no ambiente de trabalho. Além disso, consome pouquíssimos recursos e é formidável a reavivar portáteis lentos e antigos.'
            },
            'chromeos': {
                title: 'ChromeOS Flex',
                icon: 'chrome',
                img: 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Chrome_OS_logo.svg',
                badges: ['Gratuito', 'Base Linux', 'Foco Web e Estudantes'],
                desc: 'Desenvolvido pela Google, o ChromeOS converte, basicamente, qualquer computador num "Navegador Chrome Gigante". Tendo em conta que, atualmente, a grande maioria dos estudos e trabalhos ocorre 100% na Web (Google Docs, YouTube, Redes Sociais), trata-se de um sistema incrivelmente eficaz. Tem um arranque de segundos e não exige manutenções ou antivírus complexos.'
            }
        };

        let lastFocusedElement = null;
        let trapFocusListener = null;

        function openGalleryModal(osKey) {
            const data = galleryData[osKey];
            if(!data) return;

            // Guarda o elemento atual para devolver o foco ao fechar
            lastFocusedElement = document.activeElement;

            const modalImg = document.getElementById('modal-img');
            modalImg.src = data.img;
            
            // Inverte o logótipo da Apple no modal se estiver em Modo Escuro
            if(osKey === 'macos') {
                modalImg.classList.add('dark:invert', 'opacity-80');
            } else {
                modalImg.classList.remove('dark:invert', 'opacity-80');
            }

            document.getElementById('modal-title').innerHTML = `<i data-lucide="${data.icon}" class="w-6 h-6 sm:w-8 sm:h-8"></i> ${data.title}`;
            document.getElementById('modal-desc').innerHTML = data.desc;
            
            const badgesHtml = data.badges.map(b => `<span class="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs px-3 py-1 rounded font-bold uppercase tracking-wider">${b}</span>`).join('');
            document.getElementById('modal-badges').innerHTML = badgesHtml;

            const modal = document.getElementById('gallery-modal');
            modal.classList.remove('hidden');
            
            // Permite que o ecrã desenhe o elemento como "block" antes de animar a opacidade
            setTimeout(() => {
                modal.classList.remove('opacity-0');
                modal.children[0].classList.remove('scale-95');
                setupFocusTrap(modal);
            }, 10);
            
            lucide.createIcons();
        }

        // Lógica Avançada de Acessibilidade (Focus Trap)
        function setupFocusTrap(modal) {
            // Seleciona todos os elementos focáveis dentro do modal
            const focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
            if (focusableElements.length === 0) return;

            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];

            // Foca no primeiro botão (Fechar)
            firstElement.focus();

            trapFocusListener = function(e) {
                if (e.key !== 'Tab') return;

                if (e.shiftKey) { // Se Shift + Tab
                    if (document.activeElement === firstElement) {
                        lastElement.focus();
                        e.preventDefault();
                    }
                } else { // Apenas Tab
                    if (document.activeElement === lastElement) {
                        firstElement.focus();
                        e.preventDefault();
                    }
                }
            };

            modal.addEventListener('keydown', trapFocusListener);
            
            // Permite fechar com a tecla ESC
            modal.addEventListener('keydown', function escListener(e) {
                if(e.key === 'Escape') {
                    closeGalleryModal();
                    modal.removeEventListener('keydown', escListener);
                }
            });
        }

        function closeGalleryModal() {
            const modal = document.getElementById('gallery-modal');
            modal.classList.add('opacity-0');
            modal.children[0].classList.add('scale-95');
            
            if (trapFocusListener) {
                modal.removeEventListener('keydown', trapFocusListener);
            }
            
            setTimeout(() => {
                modal.classList.add('hidden');
                // Devolve o foco ao cartão que abriu o modal
                if (lastFocusedElement) {
                    lastFocusedElement.focus();
                }
            }, 300);
        }

        // ==========================================
        // 4. LÓGICA DO QUIZ MULTIPASSOS
        // ==========================================
        let quizStep = 0;
        let quizScores = { windows: 0, linux: 0, mac: 0 };
        const quizContainer = document.getElementById('quiz-container');

        const quizQuestions = [
            {
                q: "Pergunta 1/3: Qual é o seu principal foco ao usar o computador?",
                opts: [
                    { t: "Jogos e Lançamentos", icon: "gamepad-2", os: "windows", color: "blue" },
                    { t: "Programação e Servidores", icon: "code", os: "linux", color: "orange" },
                    { t: "Design e Edição de Vídeo", icon: "pen-tool", os: "mac", color: "slate" }
                ]
            },
            {
                q: "Pergunta 2/3: Qual o seu orçamento para licenças e software?",
                opts: [
                    { t: "Custo Zero (Totalmente Grátis)", icon: "piggy-bank", os: "linux", color: "green" },
                    { t: "Médio (Posso pagar uma licença)", icon: "credit-card", os: "windows", color: "blue" },
                    { t: "Alto (Quero qualidade premium)", icon: "diamond", os: "mac", color: "slate" }
                ]
            },
            {
                q: "Pergunta 3/3: O que faz se o PC der um problema técnico?",
                opts: [
                    { t: "Procuro a solução na Internet e fóruns", icon: "search", os: "linux", color: "orange" },
                    { t: "Ligo para o suporte oficial ou autorizada", icon: "phone-call", os: "mac", color: "slate" },
                    { t: "Formato a máquina e instalo de novo", icon: "refresh-cw", os: "windows", color: "blue" }
                ]
            }
        ];

        function startQuiz() {
            quizStep = 0;
            quizScores = { windows: 0, linux: 0, mac: 0 };
            renderQuiz();
        }

        function answerQuiz(os) {
            quizScores[os]++;
            quizStep++;
            renderQuiz();
        }

        function renderQuiz() {
            if (quizStep < quizQuestions.length) {
                const question = quizQuestions[quizStep];
                let html = `<h3 class="text-xl sm:text-2xl font-bold mb-8">${question.q}</h3><div class="grid gap-4 sm:grid-cols-3">`;
                
                question.opts.forEach(opt => {
                    html += `
                        <button onclick="answerQuiz('${opt.os}')" class="p-6 border-2 border-slate-200 dark:border-slate-600 rounded-xl hover:bg-${opt.color}-50 dark:hover:bg-slate-600 hover:border-${opt.color}-500 transition-all font-bold flex flex-col items-center gap-3 outline-none focus:ring-4 focus:ring-${opt.color}-400">
                            <i data-lucide="${opt.icon}" class="w-10 h-10 text-${opt.color}-500"></i> ${opt.t}
                        </button>
                    `;
                });
                
                html += `</div>`;
                quizContainer.innerHTML = html;
                lucide.createIcons();
            } else {
                let winner = Object.keys(quizScores).reduce((a, b) => quizScores[a] > quizScores[b] ? a : b);
                
                let resHtml = '';
                if(winner === 'windows') resHtml = '<i data-lucide="monitor" class="w-16 h-16 mx-auto text-blue-500 mb-4"></i><span class="text-blue-500 text-3xl font-black">Microsoft Windows</span><br><p class="mt-4 text-lg">Compatibilidade máxima com jogos e pacotes de escritório clássicos. É a escolha segura para uso corporativo e familiar.</p>';
                if(winner === 'linux') resHtml = '<i data-lucide="cpu" class="w-16 h-16 mx-auto text-orange-500 mb-4"></i><span class="text-orange-500 text-3xl font-black">Linux (Ubuntu / Mint)</span><br><p class="mt-4 text-lg">Seguro, gratuito e com total controlo. Excelente para estudantes de TI, reviver computadores antigos e evitar vírus.</p>';
                if(winner === 'mac') resHtml = '<i data-lucide="apple" class="w-16 h-16 mx-auto text-slate-800 dark:text-slate-200 mb-4"></i><span class="text-slate-800 dark:text-slate-200 text-3xl font-black">Apple macOS</span><br><p class="mt-4 text-lg">Foco extremo em design, estabilidade e ecossistema integrado. Perfeito para profissionais criativos sem limite de orçamento.</p>';

                quizContainer.innerHTML = `<div class="p-8 text-center animate-fade-in">${resHtml} <br><button onclick="startQuiz()" class="mt-8 px-6 py-2 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition">Refazer o Teste</button></div>`;
                lucide.createIcons();
                
                // Dispara os confettis apenas se o utilizador não tiver restrições de movimento
                if(typeof confetti === 'function' && !prefersReducedMotion()) {
                    confetti({ particleCount: 150, spread: 90, origin: {y: 0.6} });
                }
            }
        }
        
        startQuiz();

        // Calculadora de Economia
        function calcularEconomia() {
            let num = parseInt(document.getElementById('calc-pcs').value);
            if(num > 0) {
                document.getElementById('calc-resultado').innerText = `Economia Projetada: ${(num * 1450).toLocaleString('pt-PT', {style: 'currency', currency:'EUR'})}`;
                document.getElementById('calc-resultado').classList.remove('hidden');
            }
        }

        // ==========================================
        // 5. SIMULADOR DE DESKTOP E TERMINAL (TRÍPLICE)
        // ==========================================
        
        // -- DESKTOP SIMULATOR --
        const desktopData = {
            'win': {
                bg: 'radial-gradient(circle at bottom, #0078d4 0%, #001e36 100%)',
                taskbar: 'background: rgba(255,255,255,0.7); justify-content: center; height: 48px; width: 100%; bottom: 0; left: 0; flex-direction: row; border-top: 1px solid rgba(255,255,255,0.5); border-right: none;',
                icons: [
                    '<i data-lucide="layout-grid" class="text-blue-600 w-5 h-5 sm:w-6 sm:h-6 mx-1 sm:mx-2 cursor-pointer hover:scale-110 transition"></i>', 
                    '<i data-lucide="search" class="text-slate-600 w-5 h-5 sm:w-6 sm:h-6 mx-1 sm:mx-2 cursor-pointer hover:scale-110 transition"></i>', 
                    '<i data-lucide="folder" class="text-yellow-500 w-5 h-5 sm:w-6 sm:h-6 mx-1 sm:mx-2 cursor-pointer hover:scale-110 transition"></i>', 
                    '<i data-lucide="chrome" class="text-red-500 w-5 h-5 sm:w-6 sm:h-6 mx-1 sm:mx-2 cursor-pointer hover:scale-110 transition"></i>'
                ]
            },
            'ubuntu': {
                bg: 'linear-gradient(45deg, #4e1a3d 0%, #2c001e 100%)',
                taskbar: 'background: rgba(0,0,0,0.6); flex-direction: column; width: 45px; height: 100%; top: 0; left: 0; justify-content: flex-start; padding-top: 20px; border-right: 1px solid rgba(255,255,255,0.1); border-top: none;',
                icons: [
                    '<i data-lucide="layout-dashboard" class="text-orange-500 w-6 h-6 sm:w-7 sm:h-7 mb-4 cursor-pointer hover:scale-110 transition"></i>', 
                    '<i data-lucide="compass" class="text-orange-400 w-6 h-6 sm:w-7 sm:h-7 mb-4 cursor-pointer hover:scale-110 transition"></i>', 
                    '<i data-lucide="folder-closed" class="text-orange-300 w-6 h-6 sm:w-7 sm:h-7 mb-4 cursor-pointer hover:scale-110 transition"></i>', 
                    '<i data-lucide="terminal" class="text-slate-300 w-6 h-6 sm:w-7 sm:h-7 mb-4 cursor-pointer hover:scale-110 transition"></i>'
                ]
            },
            'macos': {
                bg: 'url("https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?q=80&w=1000&auto=format&fit=crop")',
                taskbar: 'background: rgba(255,255,255,0.3); backdrop-filter: blur(16px); width: fit-content; min-width: 200px; left: 50%; transform: translateX(-50%); bottom: 10px; border-radius: 20px; justify-content: center; height: 50px; padding: 0 10px; border: 1px solid rgba(255,255,255,0.4); box-shadow: 0 10px 25px rgba(0,0,0,0.2); flex-direction: row; border-right: 1px solid rgba(255,255,255,0.4); border-top: 1px solid rgba(255,255,255,0.4);',
                icons: [
                    '<div class="w-8 h-8 sm:w-10 sm:h-10 mx-1 sm:mx-1.5 bg-white rounded-xl flex items-center justify-center shadow-sm cursor-pointer hover:-translate-y-2 transition"><i data-lucide="compass" class="text-blue-500 w-5 h-5 sm:w-7 sm:h-7"></i></div>', 
                    '<div class="w-8 h-8 sm:w-10 sm:h-10 mx-1 sm:mx-1.5 bg-white rounded-xl flex items-center justify-center shadow-sm cursor-pointer hover:-translate-y-2 transition"><i data-lucide="message-circle" class="text-green-500 w-5 h-5 sm:w-7 sm:h-7"></i></div>', 
                    '<div class="w-8 h-8 sm:w-10 sm:h-10 mx-1 sm:mx-1.5 bg-white rounded-xl flex items-center justify-center shadow-sm cursor-pointer hover:-translate-y-2 transition"><i data-lucide="music" class="text-pink-500 w-5 h-5 sm:w-7 sm:h-7"></i></div>', 
                    '<div class="w-8 h-8 sm:w-10 sm:h-10 mx-1 sm:mx-1.5 bg-slate-800 rounded-xl flex items-center justify-center shadow-sm cursor-pointer hover:-translate-y-2 transition"><i data-lucide="terminal" class="text-white w-4 h-4 sm:w-6 sm:h-6"></i></div>'
                ]
            },
            'mint': {
                bg: 'linear-gradient(to bottom, #2f3e2f, #1a1a1a)',
                taskbar: 'background: #2b2b2b; justify-content: flex-start; height: 40px; width: 100%; bottom: 0; left: 0; flex-direction: row; border-top: 1px solid #111; border-right: none;',
                icons: [
                    '<i data-lucide="leaf" class="text-green-500 w-5 h-5 sm:w-6 sm:h-6 mr-3 sm:mr-4 ml-2 cursor-pointer hover:text-white transition"></i>', 
                    '<i data-lucide="folder" class="text-slate-300 w-4 h-4 sm:w-5 sm:h-5 mr-3 sm:mr-4 cursor-pointer hover:text-white transition"></i>', 
                    '<i data-lucide="terminal" class="text-slate-300 w-4 h-4 sm:w-5 sm:h-5 mr-3 sm:mr-4 cursor-pointer hover:text-white transition"></i>', 
                    '<i data-lucide="globe" class="text-slate-300 w-4 h-4 sm:w-5 sm:h-5 mr-3 sm:mr-4 cursor-pointer hover:text-white transition"></i>'
                ]
            }
        };

        function changeDesktopOS(os) {
            const display = document.getElementById('desktopDisplay');
            const taskbar = document.getElementById('taskbar');
            const data = desktopData[os];
            
            display.style.background = data.bg;
            display.style.backgroundSize = 'cover';
            display.style.backgroundPosition = 'center';
            
            taskbar.style.cssText = data.taskbar;
            taskbar.innerHTML = data.icons.join('');
            
            lucide.createIcons();
        }

        // Inicializar com o desktop do Windows por predefinição
        window.addEventListener('DOMContentLoaded', () => {
            changeDesktopOS('win');
        });

        // -- TERMINAL SIMULATOR --
        let currentOS = 'linux';
        const termOutput = document.getElementById('term-output');
        const termInput = document.getElementById('term-input');
        const termPrompt = document.getElementById('term-prompt');
        
        function switchTerminal(os) {
            currentOS = os;
            document.getElementById('tab-linux').className = `flex-1 min-w-[120px] py-3 px-2 sm:px-4 text-center font-bold transition outline-none ${os==='linux'?'bg-slate-700 text-white border-t-2 border-orange-500':'text-slate-400 hover:bg-slate-700 hover:text-white'}`;
            document.getElementById('tab-win').className = `flex-1 min-w-[120px] py-3 px-2 sm:px-4 text-center font-bold transition outline-none ${os==='windows'?'bg-slate-700 text-white border-t-2 border-blue-500':'text-slate-400 hover:bg-slate-700 hover:text-white'}`;
            document.getElementById('tab-macos').className = `flex-1 min-w-[120px] py-3 px-2 sm:px-4 text-center font-bold transition outline-none ${os==='macos'?'bg-slate-700 text-white border-t-2 border-slate-300':'text-slate-400 hover:bg-slate-700 hover:text-white'}`;
            
            if (os === 'linux') {
                termOutput.innerHTML = `<div>Welcome to Ubuntu 22.04 LTS (GNU/Linux).</div><div class="text-slate-400 text-xs mb-4">Simulador Didático TCC. Tente digitar <b>ls</b>, <b>ifconfig</b> ou <b>help</b>.</div>`;
                termPrompt.innerText = "admin@ubuntu:~$";
                termPrompt.className = "text-green-400 font-bold mr-2 whitespace-nowrap";
            } else if (os === 'windows') {
                termOutput.innerHTML = `<div>Microsoft Windows [Version 10.0.19045]</div><div class="text-slate-400 text-xs mb-4">(c) Microsoft Corporation. Tente digitar <b>dir</b>, <b>ipconfig</b> ou <b>help</b>.</div>`;
                termPrompt.innerText = "C:\\Users\\Admin>";
                termPrompt.className = "text-slate-300 font-bold mr-2 whitespace-nowrap";
            } else if (os === 'macos') {
                termOutput.innerHTML = `<div>Last login: ${new Date().toDateString()} on console</div><div class="text-slate-400 text-xs mb-4">macOS Terminal (zsh). Tente digitar <b>ls -la</b>, <b>pwd</b> ou <b>help</b>.</div>`;
                termPrompt.innerText = "admin@MacBook-Pro ~ %";
                termPrompt.className = "text-blue-400 font-bold mr-2 whitespace-nowrap";
            }
            
            termInput.value = '';
            termInput.focus();
        }

        termInput.addEventListener('keydown', (e) => {
            if(e.key === 'Enter') {
                const cmdOriginal = termInput.value;
                const cmd = cmdOriginal.trim().toLowerCase();
                termInput.value = '';
                termOutput.innerHTML += `<div><span class="${termPrompt.className}">${termPrompt.innerText}</span> ${cmdOriginal}</div>`;
                
                if(cmd === '') {
                    termOutput.scrollTop = termOutput.scrollHeight;
                    return;
                }
                
                let res = '';
                if(currentOS === 'linux') {
                    if(cmd==='help') res = "Comandos: ls, pwd, cd, mkdir, clear, echo, whoami, ifconfig, ping";
                    else if(cmd==='ls') res = '<span class="text-blue-400 font-bold">Documentos</span>  <span class="text-blue-400 font-bold">Downloads</span>  tcc_final.txt';
                    else if(cmd.startsWith('cd ')) res = "";
                    else if(cmd==='pwd') res = "/home/admin";
                    else if(cmd==='clear') { termOutput.innerHTML = ''; return; }
                    else if(cmd==='whoami') res = "admin";
                    else if(cmd==='ifconfig' || cmd==='ip a') res = "eth0: flags=4163<UP,BROADCAST,RUNNING>  mtu 1500\n        inet 192.168.1.100  netmask 255.255.255.0";
                    else if(cmd.startsWith('ping ')) res = `PING ${cmdOriginal.substring(5)} (8.8.8.8) 56(84) bytes of data.\n64 bytes from 8.8.8.8: icmp_seq=1 ttl=117 time=14.2 ms`;
                    else if(cmd.startsWith('echo ')) res = cmdOriginal.substring(5);
                    else res = `bash: ${cmd}: command not found`;
                } 
                else if(currentOS === 'windows') {
                    if(cmd==='help') res = "Comandos: dir, cd, mkdir, cls, echo, whoami, ipconfig, ping";
                    else if(cmd==='dir') res = " Volume in drive C has no label.\n Directory of C:\\Users\\Admin\n\n10/05/2023  14:30    <DIR>          Documentos\n12/05/2023  09:15                45 tcc_final.txt";
                    else if(cmd.startsWith('cd ')) res = "";
                    else if(cmd==='cls') { termOutput.innerHTML = ''; return; }
                    else if(cmd==='whoami') res = "desktop-win\\admin";
                    else if(cmd==='ipconfig') res = "Windows IP Configuration\n\nEthernet adapter Ethernet:\n   IPv4 Address. . . . . . . . . . . : 192.168.1.55\n   Subnet Mask . . . . . . . . . . . : 255.255.255.0";
                    else if(cmd.startsWith('ping ')) res = `Pinging ${cmdOriginal.substring(5)} with 32 bytes of data:\nReply from ${cmdOriginal.substring(5)}: bytes=32 time=14ms TTL=117`;
                    else if(cmd.startsWith('echo ')) res = cmdOriginal.substring(5);
                    else res = `'${cmd}' is not recognized as an internal or external command.`;
                }
                else if(currentOS === 'macos') {
                    if(cmd==='help') res = "Comandos: ls, ls -la, pwd, cd, clear, echo, whoami, ifconfig, ping";
                    else if(cmd==='ls') res = 'Desktop   Documents   Downloads   Library   Movies   Music   Pictures   Public';
                    else if(cmd==='ls -la' || cmd==='ls -l') res = 'drwx------+ 15 admin  staff   480 May 10 14:30 Desktop\ndrwx------+ 10 admin  staff   320 May 12 09:15 Documents';
                    else if(cmd.startsWith('cd ')) res = "";
                    else if(cmd==='pwd') res = "/Users/admin";
                    else if(cmd==='clear') { termOutput.innerHTML = ''; return; }
                    else if(cmd==='whoami') res = "admin";
                    else if(cmd==='ifconfig') res = "en0: flags=8863<UP,BROADCAST,SMART,RUNNING,SIMPLEX,MULTICAST> mtu 1500\n        inet 192.168.1.112 netmask 0xffffff00 broadcast 192.168.1.255";
                    else if(cmd.startsWith('ping ')) res = `PING ${cmdOriginal.substring(5)} (8.8.8.8): 56 data bytes\n64 bytes from 8.8.8.8: icmp_seq=0 ttl=117 time=14.231 ms`;
                    else if(cmd.startsWith('echo ')) res = cmdOriginal.substring(5);
                    else res = `zsh: command not found: ${cmd}`;
                }
                
                termOutput.innerHTML += `<div class="whitespace-pre text-slate-300 pb-2">${res}</div>`;
                termOutput.scrollTop = termOutput.scrollHeight;
            }
        });

        // ==========================================
        // 6. PLAYGROUND IA (Restrito aos Prompts do TCC)
        // ==========================================
        const chatBox = document.getElementById('chat-box');
        const chatInput = document.getElementById('chat-input');
        
        function appendMsg(text, isUser) {
            const div = document.createElement('div');
            div.className = `flex gap-3 ${isUser ? 'flex-row-reverse' : ''}`;
            const icon = isUser ? `<i data-lucide="user" class="w-5 h-5"></i>` : `<i data-lucide="bot" class="w-5 h-5"></i>`;
            const color = isUser ? 'bg-slate-800' : 'bg-blue-600';
            const bgMsg = isUser ? 'bg-indigo-100 dark:bg-indigo-900 border-indigo-200 dark:border-indigo-700' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700';
            
            div.innerHTML = `
                <div class="w-8 h-8 rounded-full ${color} flex items-center justify-center text-white shrink-0 shadow-md">${icon}</div>
                <div class="${bgMsg} p-4 rounded-xl shadow-sm border text-sm max-w-[85%] whitespace-pre-wrap leading-relaxed">${text}</div>
            `;
            chatBox.appendChild(div);
            lucide.createIcons();
            chatBox.scrollTop = chatBox.scrollHeight;
        }

        function enviarChat(txt) { chatInput.value = txt; handleChatSubmit(new Event('submit')); }

        function handleChatSubmit(e) {
            e.preventDefault();
            const msg = chatInput.value.trim();
            if(!msg) return;
            
            appendMsg(msg, true);
            chatInput.value = '';
            
            // "Digitando..." Simulação
            const idTyping = 'typing-' + Date.now();
            chatBox.innerHTML += `<div id="${idTyping}" class="flex gap-3"><div class="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white shrink-0"><i data-lucide="bot" class="w-4 h-4"></i></div><div class="bg-white dark:bg-slate-800 p-3 rounded-lg shadow-sm border text-sm max-w-[85%] text-slate-400 flex items-center gap-1">A processar código<span class="animate-bounce">.</span><span class="animate-bounce" style="animation-delay: 0.1s">.</span><span class="animate-bounce" style="animation-delay: 0.2s">.</span></div></div>`;
            chatBox.scrollTop = chatBox.scrollHeight;

            // Lógica Exclusiva para os Prompts do TCC
            setTimeout(() => {
                const el = document.getElementById(idTyping);
                if(el) el.remove();
                
                let resposta = "";
                const msgLower = msg.toLowerCase();

                if(msgLower.includes('acessibilidade web') || msgLower.includes('leitores de tela')) {
                    resposta = "✅ **Comando Reconhecido!**\n\nPara atender a este prompt, estruturei o HTML com tags semânticas, adicionei atributos `aria-label` aos botões, configurei `aria-live` nas notificações para os leitores de ecrã, criei atalhos para Alto Contraste, tamanhos de fonte e integrei as bibliotecas VLibras (para a comunidade surda) e Annyang (para os controlos de voz). Além disso, implementei o **Focus Trapping** no Modal da Galeria.";
                } else if(msgLower.includes('quiz interativo') || msgLower.includes('chapéu seletor')) {
                    resposta = "✅ **Comando Reconhecido!**\n\nDesenvolvi a lógica do Quiz armazenando perguntas num Array (vetor) de Objetos. Usei variáveis de estado em JavaScript (`quizStep` e `quizScores`) para gerir as respostas e calcular qual Sistema Operacional somava mais pontos. No final, implementei o disparo de confetes virtuais usando a biblioteca `canvas-confetti`.";
                } else if(msgLower.includes('calculadora de economia')) {
                    resposta = "✅ **Comando Reconhecido!**\n\nImplementei a função `calcularEconomia()`. Esta função em JavaScript captura o valor introduzido (quantidade de PCs), multiplica pelo custo fixo estimado de 1.450€ (Licença Windows 11 Pro + Antivírus básico) e utiliza o método nativo `.toLocaleString('pt-PT')` para formatar e renderizar o resultado perfeitamente em Euros (€).";
                } else if(msgLower.includes('simulação funcional de terminal') || msgLower.includes('terminal duplo')) {
                    resposta = "✅ **Comando Reconhecido!**\n\nCriei o layout do terminal com Tailwind CSS. Em JavaScript, adicionei um escutador de eventos (`EventListener`) para a tecla 'Enter' que interceta o texto digitado. Se for Linux, emula e responde a comandos como 'ls' e 'pwd'. Se for Windows, responde a 'dir' e 'ipconfig', construindo um registo interativo no ecrã.";
                } else if(msgLower.includes('metáfora de uma cozinha') || msgLower.includes('código aberto')) {
                    resposta = "✅ **Comando Reconhecido!**\n\nGerei a secção 'A Metáfora da Cozinha' usando os componentes visuais do Tailwind. Criei 'Cards' interativos com ícones SVG da biblioteca Lucide para explicar a estrutura do Código Aberto de forma lúdica, permitindo que qualquer utilizador não técnico entenda a diferença.";
                } else if(msgLower.includes('transições css puras') || msgLower.includes('spa') || msgLower.includes('dark mode') || msgLower.includes('modo escuro')) {
                    resposta = "✅ **Comando Reconhecido!**\n\nAdicionei a classe `dark:` nas propriedades do Tailwind para ativar o modo escuro, com as preferências guardadas usando a API `localStorage`. Para a navegação SPA (Single Page Application), construí a função Javascript `nav(pageId)` que gere a transição ocultando todas as secções (display: none) e exibindo apenas a secção selecionada (display: block), sem recarregar o navegador.";
                } else {
                    resposta = "⚠️ **Comando Não Reconhecido**\n\nDesculpe, mas como esta é uma demonstração restrita do TCC, esta Inteligência Artificial está programada para responder **apenas aos prompts exatos** utilizados pelo aluno para construir o projeto.\n\nPor favor, copie e utilize um dos prompts listados na caixa de 'Sugestões' acima ou no 'Relatório de Transparência' abaixo.";
                }
                
                appendMsg(resposta, false);
            }, 1200);
        }
