from fastapi import FastAPI
import uvicorn
import os

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Minimal works"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
