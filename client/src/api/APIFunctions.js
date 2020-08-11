const addPlayerClick = (setWinnings, name, country, winnings, imageUrl) => {
    if (winnings === '') {
        setWinnings(0);
    }
    let data = {
        name,
        country,
        winnings: parseInt(winnings),
    };
    if (imageUrl) {
        data.imageUrl = imageUrl;
    }
    (async function addPlayer() {
        const postResponse = await fetch('http://localhost:3001/players', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const response = await fetch('http://localhost:3001/players?size=60', {
            headers: {
                Accept: 'application/json',
            },
        });

        const json = await response.json();
        dispatch(fetchPlayersSuccess(json));
    })();
    setOpen(false);
};