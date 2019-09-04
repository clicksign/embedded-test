class CreateSigners < ActiveRecord::Migration[5.2]
  def change
    create_table :signers do |t|
      t.uuid :key

      t.timestamps
    end
  end
end
