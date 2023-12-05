use std::{fmt::{self, Display}, cmp};

#[derive(Clone)]
pub struct Item<'a> {
    pub name: &'a str,
    pub sell_in: i32,
    pub quality: i32,
}

impl Item<'_> {
    pub fn new(name: &str, sell_in: i32, quality: i32) -> Item {
        Item {
            name,
            sell_in,
            quality,
        }
    }
}

impl Display for Item<'_> {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "{}, {}, {}", self.name, self.sell_in, self.quality)
    }
}

pub struct GildedRose<'a> {
    pub items: Vec<Item<'a>>,
}

impl GildedRose<'_> {
    pub fn new(items: Vec<Item>) -> GildedRose {
        GildedRose { items }
    }

    fn update_item_sell_in(item: &mut Item) {
        item.sell_in = item.sell_in - 1;
    }

    fn update_backstage_pass_quality(item: &mut Item) {
        item.quality = match item.sell_in {
            sell_in if sell_in < 0 => 0,
            0..=4 => item.quality + 3,
            5..=9 => item.quality + 2,
            _ => item.quality + 1,
        };
    }

    fn update_aged_brie_quality(item: &mut Item) {
        if item.sell_in < 0 {
            item.quality += 2;
        } else {
            item.quality += 1;
        }
    }

    fn update_generic_item_quality(item: &mut Item) {
        if item.sell_in < 0 {
            item.quality -= 2;
        } else {
            item.quality -= 1;
        }
    }

    fn update_conjured_item_quality(item: &mut Item) {
        if item.sell_in < 0 {
            item.quality -= 4;
        } else {
            item.quality -= 2;
        }
    }

    fn fix_quality_constraints(item: &mut Item) {
        item.quality = cmp::min(item.quality, 50);
        item.quality = cmp::max(item.quality, 0);
    }

    fn update_item_quality(item: &mut Item) {
        match item.name {
            "Conjured Mana Cake" => Self::update_conjured_item_quality(item),
            "Backstage passes to a TAFKAL80ETC concert" => Self::update_backstage_pass_quality(item),
            "Aged Brie" => Self::update_aged_brie_quality(item),
            _ => Self::update_generic_item_quality(item),
        };

        Self::fix_quality_constraints(item);
    }

    fn update_item(item: &mut Item) {
        match item.name {
            "Sulfuras, Hand of Ragnaros" => Self::update_item_sell_in(item),
            _ => {
                Self::update_item_sell_in(item);
                Self::update_item_quality(item);
            }
        }
    }

    pub fn update_quality(&mut self) {
        for item in &mut self.items {
            Self::update_item(item);
        }
    }
}

#[cfg(test)]
mod tests {
    use super::{GildedRose, Item};

    #[test]
    pub fn sulfuras_should_update_sell_in() {
        let items = vec![Item::new("Sulfuras, Hand of Ragnaros", 10, 80)];
        let mut rose = GildedRose::new(items);
        rose.update_quality();

        assert_eq!(9, rose.items[0].sell_in);
    }

    #[test]
    pub fn sulfuras_should_keep_quality_the_same() {
        let items = vec![Item::new("Sulfuras, Hand of Ragnaros", 10, 80)];
        let mut rose = GildedRose::new(items);
        rose.update_quality();

        assert_eq!(80, rose.items[0].quality);
    }

    #[test]
    pub fn conjured_item_should_decrease_quality_faster_before_sell_date() {
        let items = vec![Item::new("Conjured Mana Cake", 1, 6)];
        let mut rose = GildedRose::new(items);
        rose.update_quality();

        assert_eq!(4, rose.items[0].quality);
    }

    #[test]
    pub fn conjured_item_should_decrease_quality_faster_after_sell_date() {
        let items = vec![Item::new("Conjured Mana Cake", 0, 6)];
        let mut rose = GildedRose::new(items);
        rose.update_quality();

        assert_eq!(2, rose.items[0].quality);
    }

    #[test]
    pub fn backstage_pass_quality_should_increase_faster_before_concert() {
        let items = vec![Item::new("Backstage passes to a TAFKAL80ETC concert", 10, 10)];
        let mut rose = GildedRose::new(items);
        rose.update_quality();

        assert_eq!(12, rose.items[0].quality);
    }

    #[test]
    pub fn backstage_pass_quality_should_increase_even_faster_before_concert() {
        let items = vec![Item::new("Backstage passes to a TAFKAL80ETC concert", 5, 10)];
        let mut rose = GildedRose::new(items);
        rose.update_quality();

        assert_eq!(13, rose.items[0].quality);
    }

    #[test]
    pub fn backstage_pass_quality_should_be_zero_after_concert() {
        let items = vec![Item::new("Backstage passes to a TAFKAL80ETC concert", 0, 10)];
        let mut rose = GildedRose::new(items);
        rose.update_quality();

        assert_eq!(0, rose.items[0].quality);
    }

    #[test]
    pub fn aged_brie_quality_should_increase_before_sell_date() {
        let items = vec![Item::new("Aged Brie", 1, 10)];
        let mut rose = GildedRose::new(items);
        rose.update_quality();

        assert_eq!(11, rose.items[0].quality);
    }

    #[test]
    pub fn aged_brie_quality_should_increase_faster_after_sell_date() {
        let items = vec![Item::new("Aged Brie", 0, 10)];
        let mut rose = GildedRose::new(items);
        rose.update_quality();

        assert_eq!(12, rose.items[0].quality);
    }
}
