import PropTypes from 'prop-types'

export default function Paragraph({ children, size = 12, color = "cyanblue"}) {
   return <p style={{ fontSize: size, color }}>{children}</p>
}

Paragraph.propTypes = {
   children: PropTypes.node.isRequired, // isRequired를 적용하면 Paragraph 안에 아무것도 없으면 에러 발생
   size: PropTypes.number,
   color: PropTypes.string
}