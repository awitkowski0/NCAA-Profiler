from sqlalchemy.orm import Session
from fastapi import HTTPException, Depends
import schemas
from models.report import Report
from models.user import User
from database import get_session

def create_report(report: schemas.ReportCreate, user: User, session: Session):
    db_report = Report(**report.dict(), user_id=user.id)
    
    session.add(db_report)
    session.commit()
    session.refresh(db_report)
    
    return db_report

def get_report(report_id: int, user: User, session: Session):
    report = session.query(Report).filter(Report.id == report_id, Report.user_id == user.id).first()
    if not report:
        raise HTTPException(status_code=404, detail="Report not found")
    return report


def get_reports(user: User, session: Session):
    reports = session.query(Report).filter(Report.user_id == user.id).all()
    return reports