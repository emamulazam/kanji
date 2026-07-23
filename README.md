# Kanji Browser

A unified web application for browsing and learning Kanji characters with support for multiple datasets.

## Features

- **Dual Dataset Support**: Switch between RTK (Remembering the Kanji) and TTC (Traditional Teaching Characters) datasets
- **Search Functionality**: Search kanji by number or character
- **Interactive Viewer**: View detailed information about each kanji including meaning, stroke count, and mnemonics
- **Keyboard Navigation**: Use arrow keys to navigate between kanji
- **Responsive Design**: Works on desktop and mobile devices

## Project Structure

```
kanji/
├── index.html              # Dataset selection page
├── app.html                # Main kanji browser interface
├── viewer.html             # Individual kanji detail viewer
├── css/
│   └── style.css          # Shared styling
├── js/
│   ├── app.js             # Main app logic (grid, search)
│   └── viewer.js          # Viewer logic (navigation, display)
├── data/
│   ├── rtk/
│   │   └── kanji.csv      # RTK dataset
│   └── ttc/
│       └── kanji.csv      # TTC dataset
└── fonts/
    ├── KanjiStrokeOrders_v4.005.ttf
    └── HGRKK.ttc
```

## How to Use

1. Open `index.html` in a web browser
2. Select your preferred dataset (RTK or TTC)
3. Browse the kanji grid or use the search features:
   - Search by kanji number
   - Search by kanji character
4. Click on any kanji to view detailed information
5. Use arrow keys or buttons to navigate between kanji

## Benefits of This Structure

✅ **Reduced Code Duplication**: Shared CSS and JavaScript for both datasets  
✅ **Easier Maintenance**: Single codebase to update instead of maintaining two separate folders  
✅ **Smaller Repository Size**: Eliminates duplicate files  
✅ **Better User Experience**: Easy dataset switching without losing navigation state  
✅ **Scalable**: Easy to add more datasets in the future

## CSV Data Format

The CSV files should follow this format:
```
kanji,meaning,story,stroke,number
漢,Sino-,story here,13,1
字,character,story here,6,2
```

Columns:
- **kanji**: The kanji character
- **meaning**: English meaning or translation
- **story**: Mnemonic or story to remember the kanji
- **stroke**: Number of strokes
- **number**: Index number in the dataset
