
from selenium import webdriver
from selenium.webdriver.common.by import By

driver = webdriver.Chrome()

driver.get("http://localhost:3000/login.html")

# Test 1: Empty username and password
driver.find_element(By.ID, "loginForm").submit()

message = driver.find_element(By.ID, "message").text

assert message == "Please enter username and password"
print("PASS: Empty login validation")

# Test 2: Correct username and password
driver.find_element(By.ID, "username").send_keys("admin")
driver.find_element(By.ID, "password").send_keys("1234")
driver.find_element(By.ID, "loginForm").submit()

message = driver.find_element(By.ID, "message").text

assert message == "Login successful"
print("PASS: Correct login")

driver.quit()
