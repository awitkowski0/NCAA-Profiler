import logging
from sqlalchemy.orm import Session
from fastapi import HTTPException, Depends
import schemas
from models.report import Report
from models.user import User
from database import get_session
from services.auth_service import get_current_user

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def create_report(report: schemas.ReportCreate, user: User, session: Session):
    logger.info(f"Creating report for user_id: {user.id} with data: {report.dict()}")
    
    db_report = Report(**report.dict(), user_id=user.id)
    session.add(db_report)
    try:
        session.commit()
        session.refresh(db_report)
        logger.info(f"Report created successfully with id: {db_report.id}")
    except Exception as e:
        session.rollback()
        logger.error(f"Error creating report: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")
    
    return db_report

def update_report(report_id: int, report: schemas.ReportCreate, user: User = Depends(get_current_user), session: Session = Depends(get_session)):
    logger.info(f"Updating report_id: {report_id} for user_id: {user.id} with data: {report.dict(exclude_unset=True)}")
    
    db_report = get_report(report_id, user, session)
    if db_report:
        for key, value in report.dict(exclude_unset=True).items():
            setattr(db_report, key, value)
        try:
            session.commit()
            session.refresh(db_report)
            logger.info(f"Report updated successfully with id: {db_report.id}")
        except Exception as e:
            session.rollback()
            logger.error(f"Error updating report: {e}")
            raise HTTPException(status_code=500, detail="Internal server error")
        return db_report
    logger.warning(f"Report with id: {report_id} not found for user_id: {user.id}")
    raise HTTPException(status_code=404, detail="Report not found")

def get_report(report_id: int, user: User, session: Session):
    logger.info(f"Fetching report_id: {report_id} for user_id: {user.id}")
    
    report = session.query(Report).filter(Report.id == report_id, Report.user_id == user.id).first()
    if not report:
        logger.warning(f"Report with id: {report_id} not found for user_id: {user.id}")
        raise HTTPException(status_code=404, detail="Report not found")
    
    logger.info(f"Report with id: {report_id} retrieved successfully for user_id: {user.id}")
    return report

def get_reports(user: User, session: Session):
    logger.info(f"Fetching all reports for user_id: {user.id}")
    
    reports = session.query(Report).filter(Report.user_id == user.id).all()
    logger.info(f"Retrieved {len(reports)} reports for user_id: {user.id}")
    
    return reports

def delete_report(report_id: int, user: User, session: Session):
    logger.info(f"Deleting report_id: {report_id} for user_id: {user.id}")
    
    db_report = get_report(report_id, user, session)
    if db_report:
        try:
            session.delete(db_report)
            session.commit()
            logger.info(f"Report with id: {report_id} deleted successfully for user_id: {user.id}")
            return {"message": "Report deleted successfully"}
        except Exception as e:
            session.rollback()
            logger.error(f"Error deleting report: {e}")
            raise HTTPException(status_code=500, detail="Internal server error")
    logger.warning(f"Report with id: {report_id} not found for user_id: {user.id}")
    raise HTTPException(status_code=404, detail="Report not found")
