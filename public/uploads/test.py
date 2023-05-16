import csv
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from bs4 import BeautifulSoup
import time

# Setup browser
browser= webdriver.Chrome()

# Navigate to book page with comments
url = "https://www.goodreads.com/book/show/41865/reviews?reviewFilters={%22workId%22:%22kca://work/amzn1.gr.work.v1.f8lFp92oAIBHtSmSo4txRg%22,%22after%22:%22NjAwMjAsMTU4ODg2NDE0MDAyNA%22}"
browser.get(url)

# Expand all comments by clicking "more" button until no more button exists
count = 0
while count < 5:
    try:
        more_button = WebDriverWait(browser, 10).until(EC.presence_of_element_located((By.XPATH, "//span[text()='Show more reviews']")))
        more_button.click()
        time.sleep(5) # Wait for comments to load
        count += 1

    except:
        print("No more comments to load")

# Parse comments using BeautifulSoup
soup = BeautifulSoup(browser.page_source, 'html.parser')
comments = soup.find_all(attrs={"class": "ReviewText"})
name = soup.find_all(attrs={"class": "ReviewerProfile__name"})
#name = soup.select(".ReviewerProfile__name")
#comments = soup.select(".ReviewText")

if comments:
    with open("comments.csv", "a", encoding="utf-8", newline="") as f:
        writer = csv.writer(f)
        for i in range(len(comments)):
            writer.writerow([i+1, name[i].text, comments[i].text])



