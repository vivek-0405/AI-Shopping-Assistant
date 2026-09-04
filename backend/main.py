import sys
from pathlib import Path

# Add project root to sys.path
ROOT_DIR = Path(__file__).resolve().parent.parent
if str(ROOT_DIR) not in sys.path:
    sys.path.insert(0, str(ROOT_DIR))

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional

from backend.agent.agent import growthpilot_agent
from backend.tools.database import (
    register_user,
    authenticate_user,
    get_all_users,
    clear_all_users
)

app = FastAPI(title="GrowthPilot AI Backend Engine")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class AgentQueryRequest(BaseModel):
    query: str
    session_id: Optional[str] = "default"

class RegisterRequest(BaseModel):
    username: str
    fullName: Optional[str] = None
    email: str
    password: str

class LoginRequest(BaseModel):
    identifier: str
    password: str

@app.get("/")
def read_root():
    return {
        "status": "online",
        "system": "GrowthPilot AI Python Agent Backend Engine",
        "frontendUrl": "http://localhost:5173/",
        "endpoints": {
            "agent_chat": "POST /api/agent/chat",
            "register": "POST /api/register",
            "login": "POST /api/login",
            "users": "GET /api/users"
        }
    }

@app.post("/api/agent/chat")
def run_agent_query(req: AgentQueryRequest):
    if not req.query or not req.query.strip():
        raise HTTPException(status_code=400, detail="Query cannot be empty")
    try:
        res = growthpilot_agent.run_mission(req.query, req.session_id)
        return {"success": True, "data": res}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/register")
def api_register(req: RegisterRequest):
    res = register_user(req.username, req.fullName, req.email, req.password)
    if not res.get("success"):
        raise HTTPException(status_code=400, detail=res.get("reason"))
    return res

@app.post("/api/login")
def api_login(req: LoginRequest):
    res = authenticate_user(req.identifier, req.password)
    if not res.get("success"):
        raise HTTPException(status_code=401, detail=res.get("reason"))
    return res

@app.get("/api/users")
def api_get_users():
    users = get_all_users()
    return {"success": True, "users": users}

@app.delete("/api/users")
def api_clear_users():
    res = clear_all_users()
    return res

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("backend.main:app", host="0.0.0.0", port=5000, reload=True)
