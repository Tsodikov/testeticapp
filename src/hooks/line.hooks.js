export const useLine = () => {
    const line = () => {
        return (
            <hr style={{
                color: '#000000',
                backgroundColor: '#000000',
                height: .5,
                borderColor : '#000000'
            }}/>
        )
    };
    return { line };
}
