/**
 * js/simulacao.js
 *
 * Controlador da Aba "Simulação".
 * (Versão atualizada: lê potência em tempo real)
 */

(function () {
    document.addEventListener('DOMContentLoaded', () => {

        // --- 1. Seletores ---
        console.log("Módulo de Simulação (simulacao.js) inicializado.");
        
        // (NOVO) Link da Nav
        const navLink = document.querySelector('.nav-link[data-page="page-simulacao"]');
        
        // Inputs
        const simTarifa = document.getElementById('sim-tarifa');
        const btnCalcular = document.getElementById('btn-calcular-simulacao');
        
        // (NOVO) Displays de Potência (para ler os valores)
        const simLivePotencia = [
            document.getElementById('sim-live-potencia-1'),
            document.getElementById('sim-live-potencia-2'),
            document.getElementById('sim-live-potencia-3'),
            document.getElementById('sim-live-potencia-4')
        ];
        
        // Inputs de Horas
        const simHoras = [
            document.getElementById('sim-horas-1'),
            document.getElementById('sim-horas-2'),
            document.getElementById('sim-horas-3'),
            document.getElementById('sim-horas-4')
        ];
        
        // Outputs (Resultados)
        const simResultadoValor = document.getElementById('sim-resultado-valor');
        const simResultadoComparativo = document.getElementById('sim-resultado-comparativo');
        
        // --- 2. Funções ---

        /**
         * Carrega a tarifa salva no localStorage (pelo realtime.js)
         * e preenche o campo de tarifa nesta aba.
         */
        function carregarTarifaSalva() {
            // (NOVO) Esta função agora é chamada sempre que a aba é clicada,
            // corrigindo o bug da tarifa não atualizar.
            const tarifaSalva = localStorage.getItem('tarifaKWh');
            if (tarifaSalva && simTarifa) { // Verifica se simTarifa não é null
                simTarifa.value = parseFloat(tarifaSalva).toFixed(2);
            }
        }
        
        /**
         * A função principal que calcula o custo.
         */
        function calcularProjecao() {
            // Verifica se os elementos existem antes de ler
            if (!simTarifa || !simLivePotencia[0] || !simHoras[0]) {
                console.error("Elementos da simulação não encontrados.");
                return;
            }

            const tarifa = parseFloat(simTarifa.value) || 0.92;
            let custoDiarioTotal = 0.0;
            
            for (let i = 0; i < 4; i++) {
                // (MUDANÇA) Lê a potência do display (que é atualizado em tempo real)
                // Usamos .textContent em vez de .value
                const potenciaW = parseFloat(simLivePotencia[i].textContent) || 0; 
                const horasDia = parseFloat(simHoras[i].value) || 0;
                
                if (potenciaW > 0 && horasDia > 0) {
                    const potenciaKW = potenciaW / 1000.0;
                    const custoCargaDiario = potenciaKW * horasDia * tarifa;
                    custoDiarioTotal += custoCargaDiario;
                }
            }
            
            const custoMensalTotal = custoDiarioTotal * 30;
            
            if(simResultadoValor) simResultadoValor.textContent = `R$ ${custoMensalTotal.toFixed(2).replace('.', ',')}`;
            
            if (custoMensalTotal > 0 && simResultadoComparativo) {
                simResultadoComparativo.textContent = `Projeção baseada em R$ ${custoDiarioTotal.toFixed(2).replace('.', ',')} por dia.`;
            } else if (simResultadoComparativo) {
                simResultadoComparativo.textContent = "Preencha os dados e calcule.";
            }
        }

        // --- 3. "Ouvintes" de Eventos ---
        
        if (btnCalcular) {
            btnCalcular.addEventListener('click', calcularProjecao);
        }
        
        // (NOVO) Corrige o bug da tarifa
        if (navLink) {
            navLink.addEventListener('click', carregarTarifaSalva);
        }
        
        // Carrega a tarifa na primeira vez
        carregarTarifaSalva();
    });
})();
