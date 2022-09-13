import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function ExamFinishCard({setShowConfirmList, setShowExam}) {

    const handleClose = () => {
        setShowConfirmList(true);
        setShowExam(false);
    }
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h5" component="div">
            Congratulations! You passed the exam.
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Unfortunately, You did not pass this exam.
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleClose}>Close</Button>
      </CardActions>
    </Card>
  );
}
