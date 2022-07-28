// "?name=asi&position=bassist"로 들어온다고 한다면
// '&'로 쪼갠다.
// key=value의 조합을 object 형태로 만든다.
// 만들어진 거 리턴한다.

export const parse = (querystring) =>
    querystring.split('&').reduce((acc, keyAndValue) => {
        const [key, value] = keyAndValue.split('=')

        if (key && value) {
            acc[key] = value
        }
        return acc
    }, {})
