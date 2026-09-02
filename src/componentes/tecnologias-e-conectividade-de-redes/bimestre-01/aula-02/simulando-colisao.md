# Guia de Simulação: CSMA/CD e CSMA/CA no Cisco Packet Tracer

Este guia prático descreve o passo a passo completo para simular e visualizar o funcionamento dos protocolos de controle de acesso ao meio **CSMA/CD** (redes cabeadas) e **CSMA/CA** (redes sem fio) utilizando o Cisco Packet Tracer.

---

## Parte 1: Simulando o CSMA/CD (Rede Cabeada)

O protocolo **CSMA/CD** (*Carrier Sense Multiple Access with Collision Detection*) é utilizado em meios compartilhados operando em *Half-Duplex*. O objetivo desta etapa é forçar uma colisão física no nível de enlace/físico e observar a resposta da rede.

### 1. Montagem da Topologia
1. Na barra de dispositivos inferiores, selecione **Hubs** e adicione um **PT-Hub** ao cenário.
2. Na categoria **End Devices**, adicione três computadores: `PC0`, `PC1` e `PC2`.
3. Conecte cada PC ao Hub utilizando cabos diretos de cobre (**Copper Straight-Through**).

### 2. Configuração de Endereçamento IP
Acesse as configurações de cada máquina em **Desktop > IP Configuration**:

* **PC0:** `192.168.1.1` | Máscara: `255.255.255.0`
* **PC1:** `192.168.1.2` | Máscara: `255.255.255.0`
* **PC2:** `192.168.1.3` | Máscara: `255.255.255.0`

### 3. Ajuste dos Filtros de Simulação
1. Mude do modo *Realtime* para o modo **Simulation** no canto inferior direito (ou atalho `Shift + S`).
2. No painel **Simulation Panel**, clique em **Edit Filters**.
3. Na aba **IPv4**, desmarque todas as opções e selecione **apenas a caixa ICMP**.

### 4. Gerando a Colisão Simultânea
1. Selecione a ferramenta **Add Simple PDU** no menu lateral direito (ícone de envelope ou tecla `P`).
2. Clique no **PC0** (origem) e depois no **PC2** (destino). Um pacote ICMP ficará enfileirado no PC0.
3. **Sem avançar o tempo**, selecione novamente a ferramenta **Add Simple PDU** (`P`).
4. Clique no **PC1** (origem) e depois no **PC2** (destino). Agora há dois pacotes ICMP configurados para disparar exatamente no mesmo milissegundo.

### 5. Execução e Análise do CSMA/CD
1. Clique no botão **Capture / Forward** (seta `|>`) **uma vez**:
   * Os dois envelopes saem do `PC0` e do `PC1` em direção ao Hub simultaneamente.
2. Clique em **Capture / Forward** **pela segunda vez**:
   * Os dois pacotes chegam ao Hub no mesmo instante. O Packet Tracer exibirá um ícone de **chamas/fogo** sobre o Hub, representando a **colisão de Camada 1**.
3. Clique em **Capture / Forward** **pela terceira vez**:
   * O Hub propaga o sinal de contaminação (*Jam Signal*) para todas as portas. Os PCs detectam o evento, descartam os dados corrompidos e ativam o algoritmo de *Backoff* (tempo de espera aleatório) antes de tentar a retransmissão.

---

## Parte 2: Simulando o CSMA/CA (Rede Sem Fio / Wi-Fi)

O protocolo **CSMA/CA** (*Carrier Sense Multiple Access with Collision Avoidance*) é utilizado no Wi-Fi. Como as estações não conseguem detectar colisões enquanto transmitem pelo ar, elas reservam o canal preventivamente através dos quadros de controle **RTS** (*Request to Send*) e **CTS** (*Clear to Send*).

### 1. Montagem da Topologia
1. Na categoria **Wireless Devices**, adicione um **Access Point** (`AP-PT`).
2. Adicione dois **Laptops** (`Laptop0` e `Laptop1`).
3. Altere o módulo de rede de cada Laptop para Wi-Fi:
   * Dê um duplo clique no Laptop.
   * Na aba **Physical**, desligue o equipamento no botão de força.
   * Remova a interface cabeada `PT-LAPTOP-NV-1CF` e insira o módulo sem fio `WPC300N`.
   * Ligue o Laptop novamente. Os dispositivos se conectarão automaticamente ao Access Point via rádio.

### 2. Configuração de IP nos Laptops
* **Laptop0:** `192.168.1.10` | Máscara: `255.255.255.0`
* **Laptop1:** `192.168.1.11` | Máscara: `255.255.255.0`

### 3. Ajuste dos Filtros para Sinalização Sem Fio
1. No **Simulation Panel**, clique em **Edit Filters**.
2. Na aba **Wireless**, marque as opções **RTS** e **CTS**.
3. Na aba **IPv4**, garanta que o **ICMP** permaneça marcado.

### 4. Ajuste do Limiar de RTS/CTS no Access Point
Por padrão, quadros pequenos como o ICMP não disparam a reserva via RTS/CTS. Vamos forçar o comportamento:
1. Clique no **Access Point** > aba **Config** > interface **Port 1**.
2. Altere o campo **RTS Threshold** para o valor `1` (força o CSMA/CA em todas as transmissões).

### 5. Execução e Análise do CSMA/CA
1. Selecione a ferramenta **Add Simple PDU** (`P`), clique no **Laptop0** (origem) e no **Laptop1** (destino).
2. Clique no botão **Capture / Forward** (`|>`) passo a passo para acompanhar o ciclo de reserva e transmissão:
   * **Passo 1 (DIFS / Escuta):** O `Laptop0` escuta o meio sem fio para verificar se o canal está livre.
   * **Passo 2 (RTS):** O `Laptop0` envia um quadro de controle **RTS** ao Access Point solicitando a reserva do meio.
   * **Passo 3 (CTS):** O Access Point responde com um quadro **CTS** em *broadcast*. Este quadro autoriza a transmissão do `Laptop0` e notifica todos os outros dispositivos na área de alcance a silenciarem suas transmissões pelo período especificado.
   * **Passo 4 (Dados e ACK):** O `Laptop0` envia os dados ICMP com garantia de meio livre e recebe a confirmação de entrega (**ACK**) no nível de enlace.