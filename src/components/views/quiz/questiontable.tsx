import { Box, Card, CardContent, CardHeader, Collapse, Grid, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel } from '@material-ui/core';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { LETTERS } from '../../../consts/letters';
import { IQuestion, IQuizSessionProps, IQuizView } from './interfaces';

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

type Order = 'asc' | 'desc';

interface HeadCell {
    disablePadding: boolean;
    id: keyof IQuestion;
    label: string;
    align: 'left' | 'right';
}

const headCells: HeadCell[] = [
    { id: 'question', align: "left", disablePadding: false, label: 'Question' },
    { id: 'userAnswers', align: "right", disablePadding: false, label: 'Choices' },
    { id: 'isMarked', align: "right", disablePadding: false, label: 'Marked' }
];

const sortQuestions = (a: IQuestion, b: IQuestion, orderBy: keyof IQuestion, order: Order) => {
    const orderMult = order === 'asc' ? 1 : -1
    switch (orderBy) {
        case 'question':
            if (a.question < b.question) return -orderMult;
            if (a.question > b.question) return orderMult;
            return 0
        case 'userAnswers':
            if (a.question < b.question) return -orderMult;
            if (a.question > b.question) return orderMult;
            return 0
        case 'isMarked':
            if (!a.isMarked && b.isMarked) return -orderMult;
            if (a.isMarked && !b.isMarked) return orderMult;
            return 0
        default:
            if (a.question < b.question) return -orderMult;
            if (a.question > b.question) return orderMult;
            return 0
    }
}

const QuestionTable = (props: IQuizSessionProps) => {
    const classes = useStyles();

    const { questions, setActiveQuestion, setQuizView } = props;

    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof IQuestion>('_id');
    const [open, setOpen] = React.useState<IQuestion>(null);


    const questionsToSort = questions.map((val, index) => { return { ...val, index } })

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
                                    {headCells.map((headCell) => (
                                        <TableCell key={headCell.id} align={headCell.align} padding={headCell.disablePadding ? 'none' : 'default'} sortDirection={orderBy === headCell.id ? order : false}>
                                            <TableSortLabel active={orderBy === headCell.id} direction={orderBy === headCell.id ? order : 'asc'} onClick={(event) => {
                                                const isAsc = orderBy === headCell.id && order === 'asc';
                                                setOrderBy(headCell.id)
                                                setOrder(isAsc ? 'desc' : 'asc');
                                            }}>{headCell.label}</TableSortLabel>
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {questionsToSort.sort((a, b) => sortQuestions(a, b, orderBy, order)).map((row, i) => (
                                    <>
                                        <TableRow className={classes.tablerow} hover onClick={(event) => setOpen(open?._id !== row._id ? row : null)} key={row._id}>
                                            <TableCell component="th" scope="row">
                                                {row.question.substring(0, 60)}
                                            </TableCell>
                                            <TableCell align="right">{row.userAnswers?.sort((a, b) => a - b).map((val) => LETTERS[val]).join(', ')}</TableCell>
                                            <TableCell align="right">{row.isMarked ? "Y" : "N"}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={3}>
                                                <Collapse in={open?._id === row._id} timeout="auto" unmountOnExit>
                                                    <ReactMarkdown>
                                                        {row.question}
                                                    </ReactMarkdown>
                                                </Collapse>
                                            </TableCell>
                                        </TableRow>
                                    </>
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