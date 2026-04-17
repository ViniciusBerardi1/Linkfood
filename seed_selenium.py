from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import Select
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.service import Service
from faker import Faker
import random
import time

fake = Faker('pt_BR')

def gerar_usuarios(quantidade):
    usuarios = []
    metade = quantidade // 2
    for i in range(quantidade):
        nome = fake.name()
        primeiro_nome = nome.split()[0].lower()
        sobrenome = nome.split()[-1].lower()
        numero = random.randint(1, 999)
        email = f"{primeiro_nome}.{sobrenome}{numero}@{fake.free_email_domain()}"
        senha = fake.password(length=10, special_chars=False)
        tipo = 'doador' if i < metade else 'receptor'
        telefone = fake.phone_number()
        endereco = fake.address().replace('\n', ', ')
        usuarios.append({
            'nome': nome,
            'email': email,
            'senha': senha,
            'tipo': tipo,
            'telefone': telefone,
            'endereco': endereco
        })
    return usuarios

def cadastrar_usuario(driver, usuario):
    driver.get('http://localhost:3000/cadastro')
    wait = WebDriverWait(driver, 10)

    wait.until(EC.presence_of_element_located((By.NAME, 'nome')))

    driver.find_element(By.NAME, 'nome').send_keys(usuario['nome'])
    driver.find_element(By.NAME, 'email').send_keys(usuario['email'])
    driver.find_element(By.NAME, 'senha').send_keys(usuario['senha'])
    driver.find_element(By.NAME, 'telefone').send_keys(usuario['telefone'])
    driver.find_element(By.NAME, 'endereco').send_keys(usuario['endereco'])

    select = Select(driver.find_element(By.NAME, 'tipo'))
    select.select_by_value(usuario['tipo'])

    driver.find_element(By.CSS_SELECTOR, 'button[type="submit"]').click()
    time.sleep(1)

try:
    quantidade = int(input("Quantos usuários deseja cadastrar pelo site? "))
    usuarios = gerar_usuarios(quantidade)

    print(f"\nIniciando cadastro de {quantidade} usuários no site...\n")

    service = Service(ChromeDriverManager().install())
    driver = webdriver.Chrome(service=service)

    sucesso = 0
    erro = 0

    for i, usuario in enumerate(usuarios):
        try:
            cadastrar_usuario(driver, usuario)
            print(f"✅ [{i+1}/{quantidade}] {usuario['nome']} ({usuario['tipo']}) cadastrado!")
            sucesso += 1
        except Exception as e:
            print(f"❌ [{i+1}/{quantidade}] Erro ao cadastrar {usuario['nome']}: {e}")
            erro += 1

    driver.quit()

    print(f"\n✅ Concluído! {sucesso} cadastrados com sucesso, {erro} erros.")

except Exception as e:
    print(f"Erro: {e}")