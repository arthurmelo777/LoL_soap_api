from zeep import Client

# URL do WSDL do servidor
wsdl_url = 'http://localhost:8000/lol-dictionary?wsdl'
client = Client(wsdl_url)

# Função para obter informações de um campeão
def get_champion_info(champion_name):
    result = client.service.getChampionInfo(name=champion_name)
    if 'error' in result:
        print(f"Erro: {result['error']}")
    else:
        champion_info = result['result']
        print(f"Nome: {champion_name}, Rota: {champion_info['lane']}, Região: {champion_info['region']}")

# Exemplos de uso
get_champion_info('Aatrox')
get_champion_info('Ahri')
get_champion_info('Aleatorio')