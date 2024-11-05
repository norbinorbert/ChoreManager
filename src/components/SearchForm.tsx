import { Button, TextField } from "@mui/material"
import { ChangeEvent } from "react"

export function Form(props: {
    keyword: string,
    onKeywordChange: (event: ChangeEvent<HTMLTextAreaElement>) => void,
    onSearch: () => void
}) {
    return (
        <>
            <TextField
                label="Search by keyword"
                variant='filled'
                value={props.keyword}
                onChange={props.onKeywordChange}
                style={{ position: 'fixed', top: '15%', left: '80%', background: 'lightgrey' }}
            />
            <Button
                variant="contained"
                color="primary"
                onClick={props.onSearch}
                style={{ position: 'fixed', top: '22.5%', left: '83%' }}
            >Search</Button>
        </>
    )
}