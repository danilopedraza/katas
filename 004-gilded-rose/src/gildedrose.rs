use std::fmt::{self, Display};
pub struct Item {
    pub name: String,
    pub sell_in: i32,
    pub quality: i32,
}

impl Item {
    pub fn new(name: impl Into<String>, sell_in: i32, quality: i32) -> Item {
        Item {
            name: name.into(),
            sell_in,
            quality,
        }
    }
}

impl Display for Item {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "{}, {}, {}", self.name, self.sell_in, self.quality)
    }
}

pub struct GildedRose {
    pub items: Vec<Item>,
}

impl GildedRose {
    pub fn new(items: Vec<Item>) -> GildedRose {
        GildedRose { items }
    }

    fn update_item_sell_in(item: &mut Item) {
        item.sell_in = item.sell_in - 1;
    }

    fn update_backstage_pass_quality(item: &mut Item) {
        if item.sell_in < 0 {
            item.quality = 0;
        } else if 0 <= item.sell_in && item.sell_in < 5 {
            item.quality += 3;
        } else if 5 <= item.sell_in && item.sell_in < 10 {
            item.quality += 2;
        } else {
            item.quality += 1;
        }
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
        if item.quality > 50 {
            item.quality = 50;
        } else if item.quality < 0 {
            item.quality = 0;
        } else {
            // nothing to do: quality is already within boundaries
        }
    }

    fn is_conjured(item: &mut Item) -> bool {
        return item.name == "Conjured Mana Cake";
    }

    fn is_backstage_pass(item: &mut Item) -> bool {
        return item.name == "Backstage passes to a TAFKAL80ETC concert";
    }

    fn is_aged_brie(item: &mut Item) -> bool {
        return item.name == "Aged Brie"
    }

    fn update_item_quality(item: &mut Item) {
        if Self::is_conjured(item) {
            Self::update_conjured_item_quality(item);
        } else if Self::is_backstage_pass(item) {
            Self::update_backstage_pass_quality(item);
        } else if Self::is_aged_brie(item) {
            Self::update_aged_brie_quality(item);
        } else {
            Self::update_generic_item_quality(item);
        }

        Self::fix_quality_constraints(item);
    }

    fn is_legendary(item: &mut Item) -> bool {
        return item.name == "Sulfuras, Hand of Ragnaros";
    }

    fn update_item(item: &mut Item) {
        Self::update_item_sell_in(item);

        if Self::is_legendary(item) {
            // nothing to do: quality of legendary items does not change
        } else {
            Self::update_item_quality(item);
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
