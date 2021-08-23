import { createStyles, makeStyles } from '@material-ui/core';

type Props = {
    a: number;
    b: number;
}

const useStyles = makeStyles(theme => createStyles({
    equation: {
        fontSize: 'clamp(32px, 20vw, 200px)',
    },
    operand: {

    },
    operator: {
        opacity: .7,
        margin: theme.spacing(1)
    },
    result: {

    }
}));

const Equation = (props: Props) => {
    const { a, b } = props;
    const classes = useStyles();

    return (
        <div className={classes.equation}>
            <span className={classes.operand}>{a}</span>
            <span className={classes.operator}>&times;</span>
            <span className={classes.operand}>{b}</span>
            <span className={classes.operator}>&#61;</span>
            <span className={classes.result}>{a * b}</span>
        </div>
    );
}

export default Equation;