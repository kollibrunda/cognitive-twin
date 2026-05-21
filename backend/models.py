# =============================================
#  COGNITIVE TWIN — Models
# =============================================

from pydantic import BaseModel
from typing import List

class QuizSubmission(BaseModel):
    name: str
    answers: List[int]

class UserRegister(BaseModel):
    name: str
    email: str
    password: str

class UserLogin(BaseModel):
    email: str
    password: str