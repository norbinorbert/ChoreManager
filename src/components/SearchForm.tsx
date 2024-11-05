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
                variant="outlined"
                value={props.keyword}
                onChange={props.onKeywordChange}
                style={{ marginBottom: '20px', width: '100%' }}
            />
            <Button
                variant="contained"
                color="primary"
                onClick={props.onSearch}
            >Search</Button>
        </>
    )
}