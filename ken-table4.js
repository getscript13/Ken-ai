// Sistema de Tabelas do Ken AI
const KenTableStyles = {
    title: 'color: #673AB7; font-weight: bold; font-size: 16px; text-transform: uppercase;',
    success: 'color: #4CAF50; font-weight: bold; font-size: 14px;',
    info: 'color: #2196F3; font-weight: bold; font-size: 14px;',
    error: 'color: #F44336; font-weight: bold; font-size: 14px;',
    reset: 'color: inherit;'
};

function kenTable(data, options = {}) {
    const { title = '', style = 'info' } = options;
    const rows = title ? [[title, ''], ['', '']] : [];
    
    if (Array.isArray(data)) {
        data.forEach(item => {
            if (Array.isArray(item)) {
                rows.push(item);
            } else if (typeof item === 'object') {
                const values = Object.values(item);
                rows.push([
                    values[0],
                    values.slice(1).map(val => 
                        val === true ? '✓' : 
                        val === false ? '✗' : 
                        val?.toString() || ''
                    ).join(' ')
                ]);
            } else {
                rows.push([item.toString(), '']);
            }
        });
    } else if (typeof data === 'object') {
        Object.entries(data).forEach(([key, value]) => {
            rows.push([key, value === true ? '✓' : value === false ? '✗' : value.toString()]);
        });
    }
    
    const maxLength = rows.reduce((max, [col1 = '', col2 = '']) => 
        Math.max(max, col1.length + col2.length), 0);
    
    console.log('\n%c┌' + '─'.repeat(maxLength + 4) + '┐', KenTableStyles[style]);
    rows.forEach(([col1 = '', col2 = '']) => {
        if (col1 === '' && col2 === '') {
            console.log('%c│' + ' '.repeat(maxLength + 4) + '│', KenTableStyles[style]);
        } else {
            const spacing = maxLength - (col1.length + col2.length);
            console.log('%c│ %s%s%s │', KenTableStyles[style], col1, ' '.repeat(spacing + 1), col2);
        }
    });
    console.log('%c└' + '─'.repeat(maxLength + 4) + '┘\n', KenTableStyles[style]);
}

// Expõe a função globalmente
window.kenTable = kenTable;
