import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getReportById } from '../services/authService';
import { Report} from '../types/reports';

const ReportDetail = () => {
  const { reportId } = useParams<{ reportId: string }>();
  const [report, setReport] = useState<Report | null>(null);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const reportData = await getReportById(Number(reportId));
        setReport(reportData);
      } catch (error) {
        console.error("Error fetching report:", error);
      }
    };

    fetchReport();
  }, [reportId]);

  if (!report) return <div>Loading...</div>;

  return (
    <div>
      <h2>Report Detail</h2>
      <p>Player ID: {report.player_id}</p>
      <p>Team ID: {report.team_id}</p>
      <p>Game ID: {report.game_id}</p>
      <p>Play ID: {report.play_id}</p>
      <p>Grade: {report.grade}</p>
      <p>Summary: {report.summary}</p>
      <p>Notes: {report.notes}</p>
    </div>
  );
};

export default ReportDetail;
