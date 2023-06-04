import json
from unidecode import unidecode

def normalize(word):
    return unidecode(word).lower()

def main():
    with open("python_scripts/category.json", "r") as f:
        data = json.load(f)

    new_data = {}
    for category in data:
        id = normalize(category["id"])
        parent = normalize(category["parent_id"])
        new_data[id] = {"children": [], "name": category["id"], "parent":parent}
    
    for category in new_data:
        parent = new_data[category]["parent"]
        if parent != "":
            new_data[parent]["children"].append(category)

    with open("python_scripts/category_data.json", "w", encoding="utf-8") as f:
        json.dump(new_data, f, indent=4, ensure_ascii=False)

if __name__ == '__main__':
    main()