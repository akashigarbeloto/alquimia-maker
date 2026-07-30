function criarRodadas() {
    const container = document.querySelector(".tabela-itens");

    for (let r = 1; r <= 5; r++) {
        const linha = document.createElement("div");
        linha.className = "linha";

        const label = document.createElement("div");
        label.className = "label-rodada";
        label.innerText = "Rodada " + r;

        const grid = document.createElement("div");
        grid.className = "grid";

        for (let i = 0; i < 8; i++) {
            const item = document.createElement("div");
            item.className = "item";
            item.dataset.id = "";
            item.dataset.nome = "";
            item.dataset.qtd = "";

            const img = document.createElement("img");
            img.crossOrigin = "anonymous";
            img.src = "https://images.weserv.nl/?url=";

            const qtd = document.createElement("div");
            qtd.className = "qtd";

            item.appendChild(img);
            item.appendChild(qtd);
            grid.appendChild(item);
        }

        linha.appendChild(label);
        linha.appendChild(grid);
        container.appendChild(linha);
    }
}

function adicionarItem() {
    const nome = document.getElementById("nomeItem").value;
    const rodada = parseInt(document.getElementById("rodadaItem").value);
    const posicao = parseInt(document.getElementById("posicaoItem").value);
    const id = document.getElementById("idItem").value;
    const img = document.getElementById("imgItem").value;
    const qtd = document.getElementById("qtdItem").value;

    if (!rodada || !posicao || !id) {
        alert("Preencha Rodada, Posição e ID!");
        return;
    }

    const linha = document.querySelectorAll(".linha")[rodada - 1];
    const item = linha.querySelectorAll(".item")[posicao - 1];

    item.dataset.id = id;
    item.dataset.nome = nome || "Sem nome";
    item.dataset.qtd = qtd || "1";

    const imgTag = item.querySelector("img");
    imgTag.src = "https://images.weserv.nl/?url=" + img;

    const qtdTag = item.querySelector(".qtd");
    qtdTag.innerText = qtd || "";
}

function exportarTXT() {
    let texto = "";

    document.querySelectorAll(".linha").forEach(linha => {
        const rodada = linha.querySelector(".label-rodada").innerText;
        texto += rodada + ":\n";

        linha.querySelectorAll(".item").forEach((item, index) => {
            const id = item.dataset.id || "vazio";
            const nome = item.dataset.nome || "Sem nome";
            const qtd = item.dataset.qtd || "0";

            texto += `  Item ${index + 1}: ${nome} (ID: ${id}) x${qtd}\n`;
        });

        texto += "\n";
    });

    const blob = new Blob([texto], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "rodadas_itens.txt";
    link.click();
}

function exportarImagem() {
    const tabela = document.querySelector(".tabela-itens");

    html2canvas(tabela, {
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#0b1119"
    }).then(canvas => {
        const link = document.createElement("a");
        link.download = "tabela_itens.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
    });
}

criarRodadas();
