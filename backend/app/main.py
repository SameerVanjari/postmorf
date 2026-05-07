from fastapi import FastAPI

app = FastAPI(title="Post morph API")

@app.get("/")
def read_root():
	return {"Hello": "Man" }


@app.get("/items/{item_id}")
def read_item(item_id: int, q: str | None = None): 
	return {"item_id": item_id, "q": q}


@app.get("/health")
def health_check():
	return {"status": "ok"}
