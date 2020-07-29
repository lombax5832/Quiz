import { Card, CardContent, CardHeader, Grid, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import React from 'react';
import { LETTERS } from '../../../consts/letters';
import { IQuizSessionProps, IQuizView } from './interfaces';

const useStyles = makeStyles({
    bottomBar: {
        display: 'block',
        width: '100%',
        position: 'fixed',
        bottom: 0,
        left: 0,
        zIndex: 1202,
        padding: '5px',
    },
    root: {
        minWidth: 275,
    },
    list: {
        width: '100%',
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    quizName: {
        fontSize: '100%',
    },
    pos: {
        marginBottom: 12,
    },
    divider: {
        marginTop: 10,
    },
    disabled: {
        color: '#c3bdbd',
    },
    tablerow: {
        cursor: "pointer",
    }
});

const QuestionTable = (props: IQuizSessionProps) => {
    const classes = useStyles();

    const { questions, setActiveQuestion, setQuizView } = props;

    const handleClick = (event, index) => {
        setActiveQuestion(index)
        setQuizView(IQuizView.QUIZ)
    }

    return (<Grid item xs={12} style={{ paddingBottom: '60px' }}>
        <Card className={classes.root}>
            <CardHeader title="Questions list"
                style={{ textAlign: 'center' }} />
            <CardContent>
                <div style={{ display: 'block', marginTop: '10px' }}>
                    <TableContainer component={Paper}>
                        <Table size="small" aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Question</TableCell>
                                    <TableCell align="right">Choices</TableCell>
                                    <TableCell align="right">Marked</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {questions.map((row, i) => (
                                    <TableRow className={classes.tablerow} hover onClick={(event)=>handleClick(event, i)} key={row._id}>
                                        <TableCell component="th" scope="row">
                                            {row.question.substring(0, 60)}
                                        </TableCell>
                                        <TableCell align="right">{row.userAnswers?.sort((a, b) => a - b).map((val) => LETTERS[val]).join(', ')}</TableCell>
                                        <TableCell align="right">{row.isMarked ? "Y" : "N"}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </CardContent>
        </Card>
    </Grid>)
}

export default QuestionTable