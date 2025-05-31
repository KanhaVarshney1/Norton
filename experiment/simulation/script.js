
        var gk_isXlsx = false;
        var gk_xlsxFileLookup = {};
        var gk_fileData = {};
        function filledCell(cell) {
            return cell !== '' && cell != null;
        }
        function loadFileData(filename) {
            if (gk_isXlsx && gk_xlsxFileLookup[filename]) {
                try {
                    var workbook = XLSX.read(gk_fileData[filename], { type: 'base64' });
                    var firstSheetName = workbook.SheetNames[0];
                    var worksheet = workbook.Sheets[firstSheetName];
                    var jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1, blankrows: false, defval: '' });
                    var filteredData = jsonData.filter(row => row.some(filledCell));
                    var headerRowIndex = filteredData.findIndex((row, index) =>
                        row.filter(filledCell).length >= filteredData[index + 1]?.filter(filledCell).length
                    );
                    if (headerRowIndex === -1 || headerRowIndex > 25) {
                        headerRowIndex = 0;
                    }
                    var csv = XLSX.utils.aoa_to_sheet(filteredData.slice(headerRowIndex));
                    csv = XLSX.utils.sheet_to_csv(csv, { header: 1 });
                    return csv;
                } catch (e) {
                    console.error(e);
                    return "";
                }
            }
            return gk_fileData[filename] || "";
        }

        let results = {
            case1: null,
            case2a: null,
            case2b: null,
            case3: null
        };
        let currentCase = 'case1';
        let observationCount = 0;
        const maxObservations = 5;
        let isAddingToTable = false;

        function updateCircuitLabels() {
            const v1 = parseFloat(document.getElementById('v1-input').value) || 0;
            const v2 = parseFloat(document.getElementById('v2-input').value) || 0;
            const r1 = parseFloat(document.getElementById('r1-input').value) || 100;
            const r2 = parseFloat(document.getElementById('r2-input').value) || 150;
            const r3 = parseFloat(document.getElementById('r3-input').value) || 200;
            const rl = parseFloat(document.getElementById('rl-input').value) || 250;

            document.getElementById('v1-label').textContent = `V1: ${v1} V`;
            document.getElementById('v2-label').textContent = `V2: ${v2} V`;
            document.getElementById('r1-label').textContent = `R1: ${r1} Ω`;
            document.getElementById('r2-label').textContent = `R2: ${r2} Ω`;
            document.getElementById('r3-label').textContent = `R3: ${r3} Ω`;
            document.getElementById('rl-label').textContent = `Rᴸ: ${rl} Ω`;
        }

        function saveCircuitDiagram() {
            const imgElement = document.getElementById('circuit-image');
            const svgElement = document.getElementById('circuit-overlay');

            // Create a canvas with the same dimensions as the circuit diagram
            const canvas = document.createElement('canvas');
            canvas.width = 600; // Match the width of the circuit diagram
            canvas.height = 400; // Match the height of the circuit diagram
            const ctx = canvas.getContext('2d');

            // Draw the image onto the canvas
            const img = new Image();
            img.crossOrigin = "Anonymous"; // In case the image is hosted on a different domain
            img.src = imgElement.src;

            img.onload = function() {
                ctx.drawImage(img, 0, 0, 600, 400);

                // Convert SVG to an image and draw it onto the canvas
                const svgData = new XMLSerializer().serializeToString(svgElement);
                const svgImg = new Image();
                svgImg.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));

                svgImg.onload = function() {
                    ctx.drawImage(svgImg, 0, 0, 600, 400);

                    // Create a downloadable link for the canvas content
                    const dataURL = canvas.toDataURL('image/png');
                    const link = document.createElement('a');
                    link.download = 'nortons-theorem.png';
                    link.href = dataURL;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                };

                svgImg.onerror = function() {
                    alert('Error rendering SVG overlay. The diagram image will be saved without labels.');
                    // Fallback: Save the image without the SVG overlay
                    const dataURL = canvas.toDataURL('image/png');
                    const link = document.createElement('a');
                    link.download = 'nortons-theorem.png';
                    link.href = dataURL;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                };
            };

            img.onerror = function() {
                alert('Error loading the circuit diagram image. Please ensure the image is accessible.');
            };
        }

        function animateMeter(needleId, shadowId, value, maxValue, isVoltmeter = false) {
            const angle = isVoltmeter ? -90 + (value / maxValue) * 90 : -90 + (value / maxValue) * 180;
            anime({
                targets: [`#${needleId}`, `#${shadowId}`],
                rotate: [
                    { value: angle * 0.9, duration: 800, easing: 'easeOutQuad' },
                    { value: angle * 1.05, duration: 300, easing: 'easeInOutQuad' },
                    { value: angle, duration: 200, easing: 'easeInOutQuad' }
                ],
                duration: 1300,
                easing: 'easeInOutQuad'
            });
        }

        function debounce(func, wait) {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        }

        const debouncedAddToObservationTable = debounce(() => {
            if (isAddingToTable) return;
            isAddingToTable = true;
            const addBtn = document.getElementById('add-to-table-btn');
            addBtn.disabled = true;
            try {
                addToObservationTable();
            } finally {
                isAddingToTable = false;
                addBtn.disabled = false;
            }
        }, 300);

        function selectTab(caseId) {
            document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
            document.querySelector(`.tab[onclick="selectTab('${caseId}')"]`).classList.add('active');

            const s1 = document.getElementById('s1');
            const s2 = document.getElementById('s2');
            const v1Input = document.getElementById('v1-input');
            const v2Input = document.getElementById('v2-input');
            const resultsTitle = document.getElementById('results-title');
            const resultsEquation = document.getElementById('results-equation');
            const switchInstruction = document.getElementById('switch-instruction');
            const addToTableBtn = document.getElementById('add-to-table-btn');
            const meterA1Label = document.getElementById('meter-a1-label');
            const meterMCLabel = document.getElementById('meter-mc-label');

            // Hide all result containers
            document.getElementById('il-container').classList.add('hidden');
            document.getElementById('vl-container').classList.add('hidden');
            document.getElementById('rl-calc-container').classList.add('hidden');
            document.getElementById('isc-container').classList.add('hidden');
            document.getElementById('v2-case2b-container').classList.add('hidden');
            document.getElementById('i-case2b-container').classList.add('hidden');
            document.getElementById('rn-container').classList.add('hidden');
            document.getElementById('il-calc-container').classList.add('hidden');
            document.getElementById('verification-container').classList.add('hidden');

            currentCase = caseId;

            if (caseId === 'case1') {
                s1.value = 'power';
                s2.value = 'load';
                v1Input.value = 220;
                v2Input.value = 110;
                resultsTitle.textContent = 'Load Current (Iₗ)';
                resultsEquation.textContent = 'Circuit analysis to determine Load Current (Iₗ). To get the load current select switches S₁ to Power and S₂ to Load. And then click on Simulate.';
                switchInstruction.textContent = 'Set switch S₁ to Power and S₂ to Load.';
                addToTableBtn.style.display = 'none';
                meterA1Label.textContent = 'Meter A1: Iₗ';
                meterMCLabel.textContent = 'Meter MC: Vₗ';
                document.getElementById('il-container').classList.remove('hidden');
                document.getElementById('vl-container').classList.remove('hidden');
                document.getElementById('rl-calc-container').classList.remove('hidden');
            } else if (caseId === 'case2a') {
                s1.value = 'power';
                s2.value = 'short';
                v1Input.value = 220;
                v2Input.value = 110;
                resultsTitle.textContent = 'Norton Short Circuit Current (Iₛ𝒸)';
                resultsEquation.textContent = 'Simulate to find Norton Short Circuit Current (Iₛ𝒸).';
                switchInstruction.textContent = 'Set switch S₁ to Power and S₂ to Short.';
                addToTableBtn.style.display = 'none';
                meterA1Label.textContent = 'Meter A1: Iₛ𝒸';
                meterMCLabel.textContent = 'Meter MC: Voltage';
                document.getElementById('isc-container').classList.remove('hidden');
            } else if (caseId === 'case2b') {
                s1.value = 'short';
                s2.value = 'power';
                v1Input.value = 0;
                v2Input.value = 110;
                resultsTitle.textContent = 'Norton Resistance (Rₙ)';
                resultsEquation.textContent = 'Simulate to find Norton Resistance (Rₙ = V/I).';
                switchInstruction.textContent = 'Set switch S₁ to Short and S₂ to Power.';
                addToTableBtn.style.display = 'none';
                meterA1Label.textContent = 'Meter A1: I';
                meterMCLabel.textContent = 'Meter MC: V₂';
                document.getElementById('v2-case2b-container').classList.remove('hidden');
                document.getElementById('i-case2b-container').classList.remove('hidden');
                document.getElementById('rn-container').classList.remove('hidden');
            } else if (caseId === 'case3') {
                s1.value = 'power';
                s2.value = 'load';
                v1Input.value = 220;
                v2Input.value = 110;
                resultsTitle.textContent = 'Calculated Load Current';
                resultsEquation.textContent = 'Iₗ = Iₛ𝒸 ⋅ (Rᴸ / (Rₙ + Rᴸ))';
                switchInstruction.textContent = 'Simulate to compare calculated Iₗ with Case 1.';
                addToTableBtn.style.display = 'inline-block';
                meterA1Label.textContent = 'Meter A1: Iₗ';
                meterMCLabel.textContent = 'Meter MC: Vₗ';
                document.getElementById('il-calc-container').classList.remove('hidden');
                document.getElementById('verification-container').classList.remove('hidden');
            }
            updateCircuitLabels();
        }

        function simulate() {
            const R1 = parseFloat(document.getElementById('r1-input').value) || 100;
            const R2 = parseFloat(document.getElementById('r2-input').value) || 150;
            const R3 = parseFloat(document.getElementById('r3-input').value) || 200;
            const RL = parseFloat(document.getElementById('rl-input').value) || 250;
            const V1 = parseFloat(document.getElementById('v1-input').value) || 0;
            const V2 = parseFloat(document.getElementById('v2-input').value) || 0;
            const S1 = document.getElementById('s1').value;
            const S2 = document.getElementById('s2').value;

            if (R1 <= 0 || R2 <= 0 || R3 <= 0 || RL <= 0) {
                alert('Resistor values must be greater than 0 to avoid division by zero.');
                return;
            }

            let IL = 0, VL = 0, ISC = 0, I_case2b = 0, V_case2b = 0, RN = 0;

            if (currentCase === 'case1' && S1 === 'power' && S2 === 'load') {
                const R_3L = R3 + RL;
                const R_23L = (R2 * R_3L) / (R2 + R_3L);
                const R_eq = R1 + R_23L;
                const I_total = (V1 + V2) / R_eq;
                const V_23L = I_total * R_23L;
                IL = V_23L / R_3L;
                VL = IL * RL;
                results.case1 = { IL, VL, RL_calc: VL / IL };
                document.getElementById('il-value').textContent = IL.toFixed(4);
                document.getElementById('vl-value').textContent = VL.toFixed(4);
                document.getElementById('rl-calc-value').textContent = (VL / IL).toFixed(4);
                animateMeter('a1-needle', 'a1-needle-shadow', Math.abs(IL), 5);
                animateMeter('mc-needle', 'mc-needle-shadow', VL, 300, true);
            } else if (currentCase === 'case2a' && S1 === 'power' && S2 === 'short') {
                const R_23 = (R2 * R3) / (R2 + R3);
                const R_eq = R1 + R_23;
                ISC = (V1 + V2) / R_eq;
                VL = 0;
                results.case2a = { ISC, VL };
                document.getElementById('isc-value').textContent = ISC.toFixed(4);
                animateMeter('a1-needle', 'a1-needle-shadow', Math.abs(ISC), 5);
                animateMeter('mc-needle', 'mc-needle-shadow', VL, 300, true);
            } else if (currentCase === 'case2b' && S1 === 'short' && S2 === 'power') {
                const R_12 = (R1 * R2) / (R1 + R2);
                RN = R_12 + R3;
                I_case2b = V2 / (R_12 + R3);
                V_case2b = I_case2b * R_12;
                results.case2b = { RN, I_case2b, V_case2b };
                document.getElementById('v2-case2b-value').textContent = V_case2b.toFixed(4);
                document.getElementById('i-case2b-value').textContent = I_case2b.toFixed(4);
                document.getElementById('rn-value').textContent = RN.toFixed(4);
                animateMeter('a1-needle', 'a1-needle-shadow', Math.abs(I_case2b), 5);
                animateMeter('mc-needle', 'mc-needle-shadow', V_case2b, 300, true);
            } else if (currentCase === 'case3' && S1 === 'power' && S2 === 'load') {
                if (!results.case2a || !results.case2b) {
                    alert('Please simulate Case 2a and Case 2b to obtain Iₛ𝒸 and Rₙ before running Case 3.');
                    return;
                }
                const R_3L = R3 + RL;
                const R_23L = (R2 * R_3L) / (R2 + R_3L);
                const R_eq = R1 + R_23L;
                const I_total = (V1 + V2) / R_eq;
                const V_23L = I_total * R_23L;
                IL = V_23L / R_3L;
                VL = IL * RL;
                results.case3 = { IL_calc: IL, VL };
                document.getElementById('il-calc-value').textContent = IL.toFixed(4);
                document.getElementById('verification-value').textContent = results.case1
                    ? (Math.abs(results.case1.IL - IL) < 0.0001 ? 'Verified' : 'Not Verified')
                    : 'Run Case 1 First';
                animateMeter('a1-needle', 'a1-needle-shadow', Math.abs(IL), 5);
                animateMeter('mc-needle', 'mc-needle-shadow', VL, 300, true);
            } else {
                alert('Invalid switch settings or case selection.');
                return;
            }
            updateCircuitLabels();
        }

        function addToObservationTable() {
            if (!results.case1 || !results.case2a || !results.case2b || !results.case3) {
                alert('Please simulate all cases (Case 1, Case 2a, Case 2b, and Case 3) before adding to the observation table.');
                return;
            }

            if (observationCount >= maxObservations) {
                alert('Maximum number of observations (5) reached. Please print the table to start over.');
                return;
            }

            const tableBody = document.getElementById('observation-body');
            const row = tableBody.rows[observationCount];
            row.cells[1].textContent = results.case1.IL.toFixed(4);
            row.cells[2].textContent = results.case1.VL.toFixed(4);
            row.cells[3].textContent = results.case1.RL_calc.toFixed(4);
            row.cells[4].textContent = results.case2a.ISC.toFixed(4);
            row.cells[5].textContent = results.case2b.V_case2b.toFixed(4);
            row.cells[6].textContent = results.case2b.I_case2b.toFixed(4);
            row.cells[7].textContent = results.case2b.RN.toFixed(4);
            row.cells[8].textContent = results.case3.IL_calc.toFixed(4);

            observationCount++;
        }

        function printPage() {
            window.print();
            const tableBody = document.getElementById('observation-body');
            for (let i = 0; i < tableBody.rows.length; i++) {
                const row = tableBody.rows[i];
                for (let j = 1; j < row.cells.length; j++) {
                    row.cells[j].textContent = '';
                }
            }
            observationCount = 0;
            results = {
                case1: null,
                case2a: null,
                case2b: null,
                case3: null
            };
            selectTab('case1');
        }

        updateCircuitLabels();
        animateMeter('a1-needle', 'a1-needle-shadow', 0, 5);
        animateMeter('mc-needle', 'mc-needle-shadow', 0, 300, true);
        selectTab('case1');
    