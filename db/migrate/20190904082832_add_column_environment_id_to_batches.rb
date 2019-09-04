class AddColumnEnvironmentIdToBatches < ActiveRecord::Migration[5.2]
  def change
    add_column :batches, :environment_id, :integer
  end
end
